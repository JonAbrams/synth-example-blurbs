synth-example-blurbs
====================

This is an example of a simple web app built on to of [synth](/JonAbrams/synth).

It shows how using a promise supporting MongoDB client driver and Angularjs can be used to make a super simple twitter-like clone.

To run this app your self install node.js then:

    npm install -g synth # You may need to put sudo in front of this command
    git clone https://github.com/JonAbrams/synth-example-blurbs
    cd synth-example-blurbs
    synth install -b -f # This will install external dependencies for back-end and front-end
    synth server # Launches the local dev server, listens on port 3000

Once the server is running, launch your browser and point it at `http://localhost:3000/`.

More example apps coming soon!
