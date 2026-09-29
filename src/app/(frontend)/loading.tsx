"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-zinc-50/70 dark:bg-[#051114]/70 backdrop-blur-md pointer-events-none overflow-hidden">
      
      <style>{`
        .tetrominos-wrapper {
          position: relative;
          width: 144px;
          height: 144px;
        }

        .tetrominos {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-112px, -96px);
        }

        .tetromino {
          width: 96px;
          height: 112px;
          position: absolute;
          transition: all ease .3s;
          background: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 684"%3E%3Cpath fill="%23010101" d="M305.7 0L0 170.9v342.3L305.7 684 612 513.2V170.9L305.7 0z"/%3E%3Cpath fill="%23fff" d="M305.7 80.1l-233.6 131 233.6 131 234.2-131-234.2-131"/%3E%3C/svg%3E') no-repeat top center;
        }
        
        /* Dark mode compatibility - invert the colors of the SVG block for dark mode */
        @media (prefers-color-scheme: dark) {
          .tetromino {
             background: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 684"%3E%3Cpath fill="%2322c55e" d="M305.7 0L0 170.9v342.3L305.7 684 612 513.2V170.9L305.7 0z"/%3E%3Cpath fill="%2318181b" d="M305.7 80.1l-233.6 131 233.6 131 234.2-131-234.2-131"/%3E%3C/svg%3E') no-repeat top center;
          }
        }

        .box1 { animation: tetromino1 1.5s ease-out infinite; }
        .box2 { animation: tetromino2 1.5s ease-out infinite; }
        .box3 { animation: tetromino3 1.5s ease-out infinite; z-index: 2; }
        .box4 { animation: tetromino4 1.5s ease-out infinite; }

        @keyframes tetromino1 {
          0%, 40% { transform: translate(0,0); }
          50% { transform: translate(48px, -27px); }
          60%, 100% { transform: translate(96px, 0); }
        }

        @keyframes tetromino2 {
          0%, 20% { transform: translate(96px, 0px); }
          40%, 100% { transform: translate(144px, 27px); }
        }

        @keyframes tetromino3 {
          0% { transform: translate(144px, 27px); }
          20%, 60% { transform: translate(96px, 54px); }
          90%, 100% { transform: translate(48px, 27px); }
        }

        @keyframes tetromino4 {
          0%, 60% { transform: translate(48px, 27px); }
          90%, 100% { transform: translate(0, 0); }
        }
      `}</style>

      {/* Ambient Mode Background Blur Layer */}
      <div className="absolute opacity-50 blur-[60px] scale-150 pointer-events-none z-0">
        <div className="tetrominos-wrapper">
          <div className="tetrominos">
            <div className="tetromino box1"></div>
            <div className="tetromino box2"></div>
            <div className="tetromino box3"></div>
            <div className="tetromino box4"></div>
          </div>
        </div>
      </div>

      {/* Crisp Foreground Layer */}
      <div className="relative z-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="tetrominos-wrapper">
          <div className="tetrominos">
            <div className="tetromino box1"></div>
            <div className="tetromino box2"></div>
            <div className="tetromino box3"></div>
            <div className="tetromino box4"></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
