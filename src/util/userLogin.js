export const login = async () => {
	// fetch from db
	return {
		username: "user",
		nickname: "user",
		journals: "test",
		lastActive: "some date",
		settings: {
			categories: [
				{
					category: "Todo",
					emoji: "✅",
					isTodo: true,
				},
				{
					category: "Thought",
					emoji: "🤓",
					isTodo: false,
				},
				{
					category: "Note",
					emoji: "✏️",
					isTodo: false,
				},
				{
					category: "Miscellaneous",
					emoji: "🧸",
					isTodo: false,
				},
				{
					category: "Misc.",
					emoji: "📌",
					isTodo: false,
				},
			],
		},
	};
};
