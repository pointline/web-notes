# Jenkins + Ansible + GitLab

## 持续交付

持续交付所需工具

- 版本控制系统：GitLab, GitHub
- 持续集成工具：Jenkins
- 部署工具：Ansible, Saltstack, Chef

## GitLab

GitLab 是一个开源分布式版本控制系统

docker 搭建

```yml
version: "3.2"

services:
  web:
    image: "gitlab/gitlab-ce:latest"
    restart: always
    hostname: "gitlab.example.com"
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url 'http://gitlab.example.com:8929'
        gitlab_rails['gitlab_shell_ssh_port'] = 2224
    ports:
      - "8929:8929"
      - "2224:22"
    volumes:
      - "./config:/etc/gitlab"
      - "./logs:/var/log/gitlab"
      - "./data:/var/opt/gitlab"
```

> 参考：https://docs.gitlab.com/omnibus/docker/

## Ansible

- Ansible 是一个开源的部署工具
- 开发语言：Python
- 特点：SSH 协议通讯，全平台，无需编译，模块化部署管理

### Ansible 的优势和应用场景

- 轻量级无客户端（Agentless）
- 开源免费，学习成本低，快速上手
- 使用 Playbook 作为核心配置架构，统一的脚本格式批量化部署
- 完善的模块化扩展，支持目前主流的开发场景
- 强大的稳定性和兼容性
- 活跃的官方社区问题，方便 Trueleshooting 与 DEBUG 问题

### Ansible 配合 virtualenv 安装配置

- Ansible 的两种安装模式（Centos7）
  - Yum 包管理安装
    - `yum -y install ansible`
  - Git 源代码安装【推荐】
    - `git clone`
  - 通过 docker 安装
    - `docker run -it -d --name python python:3.6-alpine`
    - `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ virtualenv`
  - 创建 Ansible 账户并安装 python3.6 版本 virtualenv 实例
    - `useradd deploy && su - deploy`
    - `virtualenv -p /usr/local/bin/python3 .py3-a2.5-env`

## Jenkins

- Jenkins 是一个开源持续集成工具
- 开发工具：JAVA
- 功能：提供软件开发的持续集成服务
- 特点：支持主流软件配置管理，配合实现软件配置管理，持续集成功能

### Jenkins 的优势和应用场景

- 权限管理划分不同 Job 不同角色
- 强大的负责均衡功能，保证我们项目的可靠性

### Jenkins 安装配置管理
