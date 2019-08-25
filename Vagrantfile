Vagrant.configure("2") do |config|
  
  config.vm.provider "virtualbox" do |v|
    v.memory = 5120
    v.cpus = 2
  end

  config.vm.box = "ubuntu/xenial64"
  config.vm.box_check_update = false
  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 9200, host: 9200
  # config.vm.network "forwarded_port", guest: 443, host: 443
  config.vm.synced_folder ".", "/vagrant"
  
  config.vm.provision "docker" do |d|
    d.build_image "/vagrant/elasticsearch"
    d.build_image "/vagrant/app",
      args: "-t mutant/node"
    d.run "docker.elastic.co/elasticsearch/elasticsearch:7.3.0",
      args: "--restart=always -d --name elasticsearch -p 9200:9200 -e 'http.host=0.0.0.0' -e 'transport.host=127.0.0.1'"
  end
    
  config.vm.provision "shell", inline: "sleep 60"

  config.vm.provision "docker" do |d|
    d.run "mutant/node",
      args: "-p 80:80 --link elasticsearch:elasticsearch"
  end
end