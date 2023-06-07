const fs = require('fs');
// to read files

// fs.readFileSync(('./text.txt'), (error, data) => {
//    if (error) {
//     console.log("there is an error")
//    }

//    console.log(data.toString());
// });

// to write in files 

// fs.writeFileSync('./text.txt', "hello world", () => {
//     console.log("file was written");
// });


// to make directories

// fs.mkdir("./newdir", (err) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log("the file has been created");
// });

//to delete files

fs.unlink("./text.txt", (err)=> {
    if (err) {
        console.log(err);
    }

    console.log("file succesfully deleted");
});