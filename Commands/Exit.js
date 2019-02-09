exports.cmd = async (Client, m, args) => {
	await m.channel.send("Bot turning off...");
	console.log("Exiting process with exit code: 0")
	process.exit(0);
}
exports.config = {
	permlevel: 1
} 