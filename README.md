
This is a Famous Framework application that demonstrates the use of a DDP protocol adapter component
that connects to a Meteor server. This allows the Framework application to retrieve real time 
collection data from a meteor server and to execute Meteor Methods using DDP.

To run this application you will need the Meteor server application from here...

https://github.com/tutaslabs/famous-meteor-ddp-server
(the server requires Meteor to be installed. Check their web site for info.)

You will also need nodejs and npm installed to run the Framework application. I don't think 
it will need Famous CLI to be installed.

The repo includes the Famous Engine and Framework libraries.

To run:

1) clone this repo into a clean folder
2) cd to the folder
3) run  npm install    (you will probably  need sudo to run 'sudo npm install')
4) launch application with npm run dev

The application will connect to any Meteor application running on localhost:3000


