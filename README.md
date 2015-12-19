# udp-zibase

Zibase-log
==========
Voici un petit script javascript qui permet d'afficher la log de la Zibase en temps réel.
Je l'utilise fréquemment afin de suivre l'activité de la Zibase lors de l'installation d'un nouveau scénario dans la Zibase.

<img src="http://onlinux.free.fr/pub/snapshot1.png" alt="snapshot windows" />

Le script nécessite l'installation de <a href="http://nodejs.org/download/" title="NodeJs"><img src="http://onlinux.free.fr/pub/nodejslogo.jpg" alt="nodejs logo" /><strong>NodeJs</strong></a> est disponible sous linux, Mac ou Windows.
J'ai testé le fonctionnement sous Ubuntu, Raspian ainsi que Windows7

<h1>Marche à suivre pour l'installation du script:</h1>
Avant tout, vérifiez la bonne installation de nodejs ainsi que de npm. Les commandes <em>node -v</em> et <em>npm -v</em> doivent retourner la version des applications:

Sous linux:
<pre>
pi@raspi /var/log $ node -v
v0.10.2
pi@raspi /var/log $ npm -v
1.2.15

</pre>

Sous Windows:
<a href="http://onlinux.free.fr/pub/snapshot3.png"><img src="http://onlinux.free.fr/pub/snapshot3.png" alt="snapshot3" width="1" height="1" class="alignnone size-medium wp-image-67" /><img src="http://onlinux.free.fr/pub/snapshot3.png" alt="snapshot windows" /></a>

Sous Linux, téléchargez le fichier facilement avec wget
<pre style="font-size:12px;">
pi@raspidev ~ $ <strong>wget https://github.com/onlinux/udp-zibase/archive/master.zip</strong>

</pre>
ou si git est installé
<pre>
eric@I7:~/src$ git clone https://github.com/onlinux/udp-zibase.git
Clonage dans 'udp-zibase'...
remote: Counting objects: 7, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 7 (delta 0), reused 7 (delta 0), pack-reused 0
Unpacking objects: 100% (7/7), done.
Vérification de la connectivité... fait.
eric@I7:~/src$ cd udp-zibase/
eric@I7:~/src/udp-zibase$ 


</pre>

Assurez-vous que tous les modules nodeJs sont bien installés, sous Windows ou Linux tapez:
<pre>
eric@I7:~/node/udp-zibase$ npm install
underscore@1.8.3 node_modules/underscore

string@3.3.1 node_modules/string

moment@2.10.6 node_modules/moment

request@2.67.0 node_modules/request
├── is-typedarray@1.0.0
├── aws-sign2@0.6.0
├── forever-agent@0.6.1
├── caseless@0.11.0
├── stringstream@0.0.5
├── tunnel-agent@0.4.2
├── oauth-sign@0.8.0
├── isstream@0.1.2
├── json-stringify-safe@5.0.1
├── extend@3.0.0
├── node-uuid@1.4.7
├── qs@5.2.0
├── combined-stream@1.0.5 (delayed-stream@1.0.0)
├── tough-cookie@2.2.1
├── mime-types@2.1.8 (mime-db@1.20.0)
├── form-data@1.0.0-rc3 (async@1.5.0)
├── bl@1.0.0 (readable-stream@2.0.5)
├── hawk@3.1.2 (cryptiles@2.0.5, sntp@1.0.9, boom@2.10.1, hoek@2.16.3)
├── http-signature@1.1.0 (assert-plus@0.1.5, jsprim@1.2.2, sshpk@1.7.1)
└── har-validator@2.0.3 (commander@2.9.0, chalk@1.1.1, is-my-json-valid@2.12.3, pinkie-promise@2.0.0)
eric@I7:~/node/udp-zibase$


</pre>
S'il manquait des modules, ceux-ci vont être téléchargés et installés.



Maintenant, il suffit de lancer le script.

Pour le lancer sous Linux ou Windows , tapez:
<pre>
eric@I7:~/node/udp-zibase$ npm start

> udp-zibase@1.0.0 start /home/eric/node/udp-zibase
> node app.js

Server listening 0.0.0.0:38990
Server listening 192.168.0.114:17100
<Buffer 5a 53 49 47 00 08 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
Dec 19 2015 13:09:20 AckCmd ZiBASE0059b5 IP is  192.168.0.100
1450526961
HOST REGISTERING sent to 192.168.0.100 with  1450526961as timestamp
Dec 19 2015 13:09:20 Zapi linked to host IP=192.168.0.114 UDP Port=17100
Dec 19 2015 13:09:23 Received radio ID (433Mhz Oregon Noise=2425 Level=4.2/5 Temp-Hygro Ch=1 T=+19.9C (+67.8F) Humidity=49%  Batt=Ok): OS439165441
Dec 19 2015 13:09:25 Received radio ID (433Mhz Oregon Noise=2391 Level=5.0/5 Temp-Hygro Ch=1 T=+21.6C (+70.8F) Humidity=52%  Batt=Ok): OS439191041
^CCaught interrupt signal
<Buffer 5a 53 49 47 00 16 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... >
HOST UNREGISTERING sent to 192.168.0.100
Unregistering... 70

eric@I7:~/node/udp-zibase$ exit

</pre>

