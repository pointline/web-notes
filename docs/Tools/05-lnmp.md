# Lnmp

## 挂在 aws 磁盘

[参考](https://www.cnblogs.com/huang0925/p/3879542.html)

```bash
# 查看磁盘情况
df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1      7.8G  1.1G  6.6G  14% /
devtmpfs        486M   60K  486M   1% /dev
tmpfs           499M     0  499M   0% /dev/shm

# 查看存储情况
lsblk
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0   8G  0 disk
└─xvda1 202:1    0   8G  0 part /
xvdf    202:80   0  20G  0 disk

# 使用file命令来查看该块硬盘有没有建立文件系统
sudo file -s /dev/xvdf
/dev/xvdf: data

# 使用下述命令来给xvdf来创建文件系统
sudo mkfs -t ext4 /dev/xvdf

# 然后再用file命令确认
sudo file -s /dev/xvdf

# 接下来要将该文件系统加入到当前实例的文件系统树中，这里要使用mount命令
sudo mkdir /webData
sudo mount /dev/xvdf /webData

# 搞定，现在看看EC2实例的存储情况
# 可以在/webData目录下随意创建文件和文件夹了
# 这里并不是万事大吉的时候，我们需要将该MOUNTPOINT加入到系统文件中，要不然系统重启后还是找不到该硬盘。编辑/etc/fstab文件，在其中加入以下行
sudo vim /etc/fstab
/dev/xvdf       /data   ext4    defaults,nofail        0       2

# 这样就不怕重启的时候丢失该MOUNTPOINT了。添加完毕以后可以试一下fstab文件是否能正常运行
sudo mount -a

# 如果没有错误就一切万事大吉，如果有错误而你重启了电脑的话，你就等着哭吧
```

## 安装 Lnmp

通过https://lnmp.org/安装报安装

### 修改配置文件 lnmp.conf

```bash
Download_Mirror='https://soft.vpser.net'

Nginx_Modules_Options=''
PHP_Modules_Options=''

##MySQL/MariaDB database directory##
MySQL_Data_Dir='/webData/usr/local/mysql/var'
MariaDB_Data_Dir='/webData/usr/local/mariadb/var'
##Default website home directory##
Default_Website_Dir='/webData/wwwroot/default'

Enable_Nginx_Openssl='y'
Enable_PHP_Fileinfo='n'
Enable_Nginx_Lua='n'
Enable_Swap='y'
```

### 运行安装文件，选择配置

```bash
./install.sh lnmp
```

- Mysql 5.7.26
  - enable the InnoDB Storage Engine
- PHP 7.2.24
- Install Jemalloc

### 生成配置文件

```conf
; 修改
disable_functions = passthru,system,chroot,chgrp,chown,shell_exec,proc_open,proc_get_status,popen,ini_alter,ini_restore,dl,readlink,symlink,popepassthru,stream_socket_server

; 修改
expose_php = Off

; 开启
max_input_vars = 5000

; 修改
memory_limit = 4048M

; 修改
post_max_size = 128M

; [opcache]
opcache.enable=1
opcache.enable_cli=0
opcache.memory_consumption=512
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=60000
opcache.validate_timestamps=1
opcache.revalidate_freq=6
opcache.consistency_checks=0
```

## magento 配置

在项目目录下创建 magento2-cors.conf 文件，写入以下内容

```conf
# Note: for 'Access-Control-Allow-Origin' we use '*' instead of 'https://www.your-website.co.uk'
# to be absolutely sure that these assets can be served to any origin, since we have a mixture of CDN,
# frontend url and admin url. We want to mitigate the risk of these PUBLIC assets not being served.

add_header 'Access-Control-Allow-Origin' '*' 'always';

if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' '*' 'always';
    add_header 'Access-Control-Allow-Headers' 'x-requested-with' 'always';
    add_header 'Access-Control-Max-Age' 86400 'always';
    add_header 'Content-Length' 0 'always';
    return 204;
}
```

在安装页面是，请求出错。修改 nginx.conf.sample

```conf
location ~* ^/setup($|/) {
    root $MAGE_ROOT;
    location ~ ^/setup/index.php {
        ; 加入下面这句话
        fastcgi_split_path_info ^(.+?\.php)(/.*)$;

        fastcgi_pass   fastcgi_backend;

        fastcgi_param  PHP_FLAG  "session.auto_start=off \n suhosin.session.cryptua=off";
        fastcgi_param  PHP_VALUE "memory_limit=756M \n max_execution_time=600";
        fastcgi_read_timeout 600s;
        fastcgi_connect_timeout 600s;

        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        include        fastcgi_params;
    }

    location ~ ^/setup/(?!pub/). {
        deny all;
    }

    location ~ ^/setup/pub/ {
        add_header X-Frame-Options "SAMEORIGIN";
    }
}
```
