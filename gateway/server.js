require('dotenv').config();
const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const verifyTokenGateway = (req, res, next) => {
    const publicRoutes = [
        '/auth/register',
        '/auth/login'
    ];

    if (publicRoutes.some(route => req.originalUrl.startsWith(route))) {
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token tidak ditemukan, harap login terlebih dahulu'
        });
    }

     try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        req.headers['x-user-id'] = String(verified.id);
        req.headers['x-user-role'] = verified.role;
        next();
    } catch (err) {
        res.status(403).json({
            success: false,
            message: "Token tidak valid",
            data: err.message
        });
    }
};

app.use(verifyTokenGateway);

app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/auth': '' },
    on: { proxyReq: fixRequestBody }
}));

app.use('/dosen', createProxyMiddleware({
    target: process.env.DOSEN_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/dosen': '' },
    on: { proxyReq: fixRequestBody }
}));

app.use('/mahasiswa', createProxyMiddleware({
    target: process.env.MAHASISWA_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/mahasiswa': '' },
    on: { proxyReq: fixRequestBody }
}));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`API Gateway berjalan di port ${PORT}`);
});