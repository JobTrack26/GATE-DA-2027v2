#!/usr/bin/env python3
"""
GATE DA 2027 Master Portal - Local Server Launcher
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

import mimetypes
mimetypes.init()
mimetypes.add_type('application/pdf', '.pdf')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        if self.path.endswith('.pdf'):
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Cache-Control', 'public, max-age=31536000')
        else:
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
                url = f"http://localhost:{port}/index.html"
                print("=" * 65)
                print("  [*] GATE DA 2027 STUDY PLATFORM - READY TO CRACK THE EXAM!")
                print("=" * 65)
                print(f"  Local Server Running at: {url}")
                print("  Features:")
                print("    - 9 Core Subjects (59 Chapters, 279 Curated Video Lectures)")
                print("    - 9 Official Complete Handbooks (PDFs ready offline)")
                print("    - Embedded Inline & Theater Mode Video Player")
                print("    - GATE Virtual Scientific Calculator (TCS iON Replica)")
                print("    - Practice Arena with MCQ, MSQ & NAT questions")
                print("    - Formula Cheatsheets & Syllabus Tracker")
                print("=" * 65)
                print("  Press Ctrl+C to stop the server.")
                print("=" * 65)
                
                webbrowser.open(url)
                httpd.serve_forever()
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 10048:
                port += 1
            else:
                raise e

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nServer stopped. Best of luck for GATE DA 2027!")
        sys.exit(0)
