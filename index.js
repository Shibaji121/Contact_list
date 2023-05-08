const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //looking into views folder in the current directory
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware1 C:\Program Files\MongoDB\Server\6.0\data\
// app.use(function(req, res, next){
//     console.log('Middle1 Called');
//     next();
// })

//middleware 2
// app.use(function(req, res, next){
//     console.log('Middle 2 Called');
//     next();
// })


var contactList = [
    {
        name: 'Shibaji',
        phone: '1111111'
    },
    {
        name: 'Sahu',
        phone: '222222'
    },
    {
        name: 'Balaji',
        phone: '333333'
    }
]


app.get('/', function(req, res){
    //console.log(__dirname); //logs data -D:\WebDevelopment\NodeEWS\Contact_list  
    //res.send('Its Running');

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching Data');
            return;
        }
        return res.render('home', {
            title: 'Contact List',
            contact_list: contacts
        });
    }); 
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: 'Let Us Play with ejs',
        contact_list: contactList
    })
});

app.post('/create-contact', function(req, res){
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body);
    // return res.redirect('back');
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating contact!');
            return;
        }
        console.log('**********', newContact);
        return res.redirect('back');
    });
})

// for deleting a contact
app.get('/delete-contact', function(req, res){
    //get the id from query in the url
    let id = req.query.id;
    
    //find the contact in the database using id
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in delete');
            return;
        }
        return res.redirect('back');
    });


    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1)
    // {
    //     contactList.splice(contactIndex, 1);
    // }
    
});


app.listen(port, function(err){
    if(err){
        console.log('Error Occured', err);
    }
    console.log('Express Server Starts: ', port);
})