#!/usr/bin/env python3
"""
简单的Web服务器，用于本地测试老年人陪伴系统
"""

import http.server
import socketserver
import os
import webbrowser
from threading import Timer

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def open_browser():
    """延迟打开浏览器"""
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == "__main__":
    # 切换到当前目录
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # 创建服务器
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"服务器已启动！")
        print(f"请在浏览器中访问: http://localhost:{PORT}")
        print("按 Ctrl+C 停止服务器")
        
        # 1秒后自动打开浏览器
        Timer(1.0, open_browser).start()
        
        # 启动服务器
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")
            httpd.shutdown()