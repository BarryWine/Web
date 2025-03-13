const fs = require('fs');
const http = require("http");

http.createServer((req, res) => {
    const url = req.url;
    console.log(`Akses: ${url}`);

    // Fungsi untuk mengirim file berdasarkan path dan status code yang diberikan.
    const serveFile = (filePath, statusCode = 200) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // Jika terjadi error saat membaca file, kirim respons error 500.
                res.writeHead(500, { "Content-Type": "text/html" });
                res.write("<h1>500 - Internal Server Error</h1>");
                return res.end();
            }
            // Kirim file dengan status code yang sesuai.
            res.writeHead(statusCode, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
        });
    };

    // Routing berdasarkan URL yang diminta
    if (url === "/about") {
        serveFile('./about.html');
    } else if (url === "/contact") {
        // Menyajikan halaman contact dari file contact.html
        serveFile('./contact.html');
    } else if (url === "/") {
        serveFile('./index.html');
    } else {
        // Untuk URL yang tidak dikenal, tampilkan halaman 404 custom.
        serveFile('./404.html', 404);
    }
}).listen(3000, () => {
    console.log("Server berjalan pada port 3000...");
});
