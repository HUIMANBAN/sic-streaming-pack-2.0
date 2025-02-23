import path from "path";
import url from "url";

function getDirName(fileURL) {
    return path.dirname(url.fileURLToPath(fileURL));
}

export default getDirName;