function sendHTML(response, filePath) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    try {
        response.sendFile(filePath);
    } catch (err) {
        if (err) {
            response.status(404).send("File not found");
        } else {
            response.status(200);
        }
    }
}

export default sendHTML;