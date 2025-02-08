import getCurrentTime from "./getCurrentTime.mjs";

function sendHTML(res, filePath) {
    try {
        res.sendFile(filePath);
    } catch (err) {
        if (err) {
            res.status(404).send("File not found");
            console.log(`${getCurrentTime()} [ERROR] File not found: ${filePath}`);
        } else {
            res.status(200);
        }
    } finally {
        if (res.statusCode === 200) {
            console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} OK]`);
        } else if (res.statusCode === 404) {
            console.log(`${getCurrentTime()} [INFO] Response sent: [${res.statusCode} Not Found]`);
        }
    }
}

export default sendHTML;