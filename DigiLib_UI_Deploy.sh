cd /home/ec2-user/
rm -R -f build/
wget https://github.com/sharathkumbar1/DigitalLibrary/archive/refs/heads/master.zip
unzip master.zip
mv DigitalLibrary-master/build/ /home/ec2-user/
chown -R root:root build
mv -f DigitalLibrary-master/nginx.conf /etc/nginx/
chown -R root:root /etc/nginx/nginx.conf
rm -R -f DigitalLibrary-master/
rm -f master.zip
service nginx restart
