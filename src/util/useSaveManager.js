import { useEffect, useState } from "react";
import { message } from "antd";

export default function useSaveManager() {
	let [saving, setSaving] = useState(false);

	// This is the message key
	const messageKey = "save";

	// handle fetch
	const postData = async (dataToPost, action, user, type) => {
		message.loading({
			content: "Saving......Please do not refresh the page",
			duration: 0,
			key: messageKey,
		});

		let url = "http://localhost:8000/api/" + user;
		if (type === "journal") url += "/journals";
		else if (type === "category") url += "/settings";

		let response;
		try {
			response = await fetch(url, {
				method: action,
				headers: {
					"Content-Type": "application/json",
				},
				body: dataToPost,
			});
		} catch {
			response = null;
		}
		if (response && response.ok) {
			message.success({
				content: "Save successful!",
				duration: 3,
				key: messageKey,
			});
			return true;
		} else {
			return false;
		}
	};

	const prepPost = (el) => {
		let action = el.action;
		let user = el.user;
		delete el["action"];
		delete el["user"];
		return [action, user];
	};

	useEffect(() => {
		const post = async (type) => {
			let storage = JSON.parse(localStorage.getItem(type + "Temp"));
			while (storage.length !== 0) {
				let [action, user] = prepPost(storage[0]);
				let success = await postData(
					JSON.stringify(storage[0]),
					action,
					user,
					type
				);
				if (success) {
					storage.shift();
					localStorage.setItem(
						type + "Temp",
						JSON.stringify(storage)
					);
				} else {
					break;
				}
			}
		};

		// save function
		const save = async () => {
			// scan localStorage.journalTemp
			if (localStorage.journalTemp.length !== 0) {
				await post("journal");
			}
			// scan localStorage.categoryTemp
			if (localStorage.categoryTemp.length !== 0) {
				await post("category");
			}
			setSaving(false);
		};

		// Main useEffect logic
		if (saving) {
			save();
		} else {
			if (
				(localStorage.journalTemp &&
					localStorage.journalTemp !== "[]") ||
				(localStorage.categoryTemp &&
					localStorage.categoryTemp !== "[]")
			) {
				// wait for some amount of time then retry
				if (localStorage.saveTimer) {
					clearInterval(localStorage.saveTimer);
					clearTimeout(localStorage.saveTimeout);
				}
				let tic = Number(localStorage.saveTime);
				// Increase retry time
				localStorage.setItem(
					"saveTime",
					Math.min(45, Math.floor(tic * 1.5))
				);
				let timer = setInterval(() => {
					message.warning({
						content:
							"Saving failed. Retrying in " +
							tic +
							" seconds......",
						duration: 0,
						key: messageKey,
					});
					tic--;
				}, 1000);
				localStorage.setItem("saveTimer", timer);
				// Set up retry
				let timeout = setTimeout(() => {
					setSaving(true);
					clearInterval(localStorage.saveTimer);
					localStorage.setItem("saveTimer", null);
					localStorage.setItem("saveTimeout", null);
				}, (tic + 1) * 1000);
				localStorage.setItem("saveTimeout", timeout);
			}
		}
	}, [saving, setSaving]);

	return [setSaving];
}
