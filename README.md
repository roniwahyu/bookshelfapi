# DICODING bookshelfapi Submission
Terdapat 5 kriteria utama yang harus Anda penuhi dalam membuat proyek Bookshelf API.

### Kriteria 1 : API dapat menyimpan buku

API yang Anda buat harus dapat menyimpan buku melalui _route_:

*   Method : **POST**
*   URL : **/books**
*   Body Request:
```   
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
    }
```    

Objek buku yang disimpan pada _server_ harus memiliki struktur seperti contoh di bawah ini:
```
{
    **"id": "Qbax5Oy7L8WKf74l",**
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    **"finished": false,**
    "reading": false,
  **  "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"**
}
```
Properti yang ditebalkan diolah dan didapatkan di sisi _server_. Berikut penjelasannya:

*   id : nilai id haruslah unik. Untuk membuat nilai unik, Anda bisa memanfaatkan [nanoid](https://www.npmjs.com/package/nanoid).
*   finished : merupakan properti _boolean_ yang menjelaskan apakah buku telah selesai dibaca atau belum. Nilai finished didapatkan dari observasi pageCount === readPage.
*   insertedAt : merupakan properti yang menampung tanggal dimasukkannya buku. Anda bisa gunakan new Date().toISOString() untuk menghasilkan nilainya.
*   updatedAt : merupakan properti yang menampung tanggal diperbarui buku. Ketika buku baru dimasukkan, berikan nilai properti ini sama dengan insertedAt.
    

Server harus merespons **gagal** bila:

*   Client tidak melampirkan properti namepada _request body_. Bila hal ini terjadi, maka _server_ akan merespons dengan:
    *   Status Code : **400**
    *   Response Body:
```        
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        }
```        
*   Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka _server_ akan merespons dengan:
    *   Status Code : **400**
    *   Response Body:
```        
        {
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }
```       
*   Server gagal memasukkan buku karena alasan umum (_generic error_). Bila hal ini terjadi, maka _server_ akan merespons dengan:
    *   Status Code : **500**
    *   Response Body:
```        
        {
            "status": "error",
            "message": "Buku gagal ditambahkan"
        }
```        

Bila buku **berhasil** dimasukkan, _server_ harus mengembalikan respons dengan:

*   Status Code : **201**
*   Response Body:
```    
    {
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "bookId": "1L7ZtDUFeGs7VlEt"
        }
    }
```    

  

### Kriteria 2 : API dapat menampilkan seluruh buku

API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui _route_:

*   Method : **GET**
*   URL: **/books**
    

Server harus mengembalikan respons dengan:

*   Status Code : **200**
*   Response Body:
```    
    {
        "status": "success",
        "data": {
            "books": \[
                {
                    "id": "Qbax5Oy7L8WKf74l",
                    "name": "Buku A",
                    "publisher": "Dicoding Indonesia"
                },
                {
                    "id": "1L7ZtDUFeGs7VlEt",
                    "name": "Buku B",
                    "publisher": "Dicoding Indonesia"
                },
                {
                    "id": "K8DZbfI-t3LrY7lD",
                    "name": "Buku C",
                    "publisher": "Dicoding Indonesia"
                }
            \]
        }
    }
    
```
Jika **belum** terdapat buku yang dimasukkan, _server_ bisa merespons dengan _array_ books kosong.
```
{
    "status": "success",
    "data": {
        "books": \[\]
    }
}
```
  

### Kriteria 3 : API dapat menampilkan detail buku

API yang Anda buat harus dapat menampilkan seluruh buku yang disimpan melalui _route_:

*   Method : **GET**
*   URL: **/books/{bookId}**
    

Bila buku dengan id yang dilampirkan oleh _client_ tidak ditemukan, maka _server_ harus mengembalikan respons dengan:

*   Status Code : **404**
*   Response Body:
```    
    {
        "status": "fail",
        "message": "Buku tidak ditemukan"
    }
```    

Bila buku dengan id yang dilampirkan **ditemukan**, maka _server_ harus mengembalikan respons dengan:

*   Status Code : **200**
*   Response Body:
```    
    {
        "status": "success",
        "data": {
            "book": {
                "id": "aWZBUW3JN\_VBE-9I",
                "name": "Buku A Revisi",
                "year": 2011,
                "author": "Jane Doe",
                "summary": "Lorem Dolor sit Amet",
                "publisher": "Dicoding",
                "pageCount": 200,
                "readPage": 26,
                "finished": false,
                "reading": false,
                "insertedAt": "2021-03-05T06:14:28.930Z",
                "updatedAt": "2021-03-05T06:14:30.718Z"
            }
        }
    }
    
```
  

### Kriteria 4 : API dapat mengubah data buku

API yang Anda buat harus dapat mengubah data buku berdasarkan id melalui _route_:

*   Method : **PUT**
*   URL : **/books/{bookId}**
*   Body Request:
```   
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
    }
    
```
Server harus merespons **gagal** bila:

*   Client tidak melampirkan properti name pada _request body_. Bila hal ini terjadi, maka _server_ akan merespons dengan:
    *   Status Code : **400**
    *   Response Body:
```        
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        }
```        
*   Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka _server_ akan merespons dengan:
    *   Status Code : **400**
    *   Response Body:
```        
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }
```        
*   Idyang dilampirkan oleh _client_ tidak ditemukkan oleh _server_. Bila hal ini terjadi, maka _server_ akan merespons dengan:
    *   Status Code : **404**
    *   Response Body:
 ```       
        {
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        }
 ```       

Bila buku **berhasil diperbarui**, _server_ harus mengembalikan respons dengan:

*   Status Code : **200**
*   Response Body:
```    
    {
        "status": "success",
        "message": "Buku berhasil diperbarui"
    }
```   

  

### Kriteria 5 : API dapat menghapus buku

API yang Anda buat harus dapat menghapus buku berdasarkan id melalui _route_ berikut:

*   Method : **DELETE**
*   URL: /books/{bookId}

Bila id yang dilampirkan tidak dimiliki oleh buku manapun, maka _server_ harus mengembalikan respons berikut:

*   Status Code : **404**
*   Response Body:
```    
    {
        "status": "fail",
        "message": "Buku gagal dihapus. Id tidak ditemukan"
    }
```   

Bila id dimiliki oleh salah satu buku, maka buku tersebut harus dihapus dan _server_ mengembalikan respons berikut:

*   Status Code : **200**
*   Response Body:
```    
    {
        "status": "success",
        "message": "Buku berhasil dihapus"
    }
```