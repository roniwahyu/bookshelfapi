const http = require("http");
const port = 5000;
const host = "localhost";
/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method,url } = request;
  
  if (url === "/") {
    // curl http://localhost:5000/
    if (method === "GET") {
      // response ketika GET
      response.end("<h1>Hello GET!</h1>");
    }
    if (method === "POST") {
      // response ketika POST
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });

      // response.end("<h1>Hai POST!</h1>");
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Hai, ${name}!</h1>`);
      });
    }
  }else if (url === "/about") {
    // curl http://localhost:5000/about
    if (method === "GET") {
      // response ketika GET
      response.end("<h1>Hello GET!</h1>");
    }
    if (method === "POST") {
      // response ketika POST
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });

      // response.end("<h1>Hai POST!</h1>");
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Hai, ${name}!</h1>`);
      });
    }
  }else{
    response.end(`<h1>Halaman ${url} tidak ditemukan dengan method ${method}!</h1>`);
  }

  if (method === "PUT") {
    response.end("<h1>Sukses PUT!</h1>");
  }
  if (method === "DELETE") {
    response.end("<h1>Sukses DELETE!</h1>");
  }

  //   response.end("<h1>Halo HTTP Server!</h1>");
};
const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
