# 部署说明

## 一、项目打包

1. 运行打包命令：

```bash
npm run build
```

2. 打包后会在项目根目录生成 `build` 目录（如需 `dist` 目录，可在 package.json 中配置 build 输出目录）。

## 二、Nginx 部署配置

1. 将 `build` 目录下所有文件上传到服务器指定目录（如 `/usr/share/nginx/html/your-app`）。

2. 配置 Nginx，示例：

```nginx
server {
    listen       80;
    server_name  your-domain.com;
    root   /usr/share/nginx/html/your-app;
    index  index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- 关键配置：`try_files $uri $uri/ /index.html;`，用于解决前端路由刷新 404 问题。

3. 重载 Nginx 配置：

```bash
sudo nginx -s reload
```

4. 访问 `http://your-domain.com` 即可。

## 三、常见问题
- 路由刷新 404：确保 Nginx 配置了 `try_files`，所有未命中的路由都回退到 `index.html`。
- 静态资源路径问题：如需自定义资源路径，可在 `package.json` 中设置 `homepage` 字段。

---
如有其他部署环境需求（如 Docker、云服务等），可进一步补充说明。
