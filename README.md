synth-example-blurbs
====================

This is an example of a simple web app built on top of [synth](/JonAbrams/synth).

You can interact with a live demo version [here](http://blurbs.synthjs.com/blurbs).

It shows how using a promise supporting MongoDB client driver and Angularjs can be used to make a super simple twitter-like clone.

To run this app your self install node.js then:

    npm install -g synth # You may need to put sudo in front of this command
    git clone https://github.com/JonAbrams/synth-example-blurbs
    cd synth-example-blurbs
    synth install -b # This will install external dependencies back-end
    synth install -f # This will install external dependencies front-end
    synth server # Launches the local dev server, listens on port 3000

Once the server is running, launch your browser and point it at `http://localhost:3000/`.

More example apps coming soon!
