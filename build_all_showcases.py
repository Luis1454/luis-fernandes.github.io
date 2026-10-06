import os
import math
import json
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.abspath("assets/project-art")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Color Constants
C_BG = (11, 15, 23)
C_PANEL = (13, 17, 24)
C_BORDER = (45, 55, 72)
C_HEADER = (20, 26, 38)
C_TEXT_WHITE = (241, 245, 249)
C_TEXT_DIM = (100, 116, 139)
C_TEXT_MUTED = (71, 85, 105)
C_BLUE = (56, 189, 248)
C_CYAN = (34, 211, 238)
C_GREEN = (52, 211, 153)
C_YELLOW = (251, 191, 36)
C_RED = (248, 113, 113)
C_PURPLE = (192, 132, 252)
C_ORANGE = (251, 146, 60)
C_PROMPT = (16, 185, 129)

FONT_REGULAR = "/usr/share/fonts/source-foundry-hack-fonts/Hack-Regular.ttf"
FONT_BOLD = "/usr/share/fonts/source-foundry-hack-fonts/Hack-Bold.ttf"

f_sm = ImageFont.truetype(FONT_REGULAR, 12)
f_md = ImageFont.truetype(FONT_REGULAR, 13)
f_md_b = ImageFont.truetype(FONT_BOLD, 13)
f_lg = ImageFont.truetype(FONT_BOLD, 15)
f_title = ImageFont.truetype(FONT_BOLD, 15)
f_badge = ImageFont.truetype(FONT_BOLD, 11)

def base_canvas():
    img = Image.new("RGB", (1280, 720), C_BG)
    draw = ImageDraw.Draw(img)
    for x in range(0, 1280, 40):
        draw.line([(x, 0), (x, 720)], fill=(16, 21, 32), width=1)
    for y in range(0, 720, 40):
        draw.line([(0, y), (1280, y)], fill=(16, 21, 32), width=1)
    return img, draw

def draw_frame(draw, title, subtitle, badge_text, badge_color=C_GREEN):
    bx, by, bw, bh = 32, 24, 1216, 672
    draw.rounded_rectangle([bx-2, by-2, bx+bw+2, by+bh+2], radius=12, fill=(15, 20, 30), outline=(30, 41, 59), width=1)
    draw.rounded_rectangle([bx, by, bx+bw, by+bh], radius=10, fill=C_PANEL, outline=C_BORDER, width=1)
    
    header_h = 42
    draw.rounded_rectangle([bx, by, bx+bw, by+header_h], radius=10, fill=C_HEADER)
    draw.rectangle([bx, by+header_h-10, bx+bw, by+header_h], fill=C_HEADER)
    draw.line([(bx, by+header_h), (bx+bw, by+header_h)], fill=C_BORDER, width=1)
    
    by_btn = by + 15
    draw.ellipse([bx+16, by_btn, bx+28, by_btn+12], fill=(239, 68, 68))
    draw.ellipse([bx+36, by_btn, bx+48, by_btn+12], fill=(245, 158, 11))
    draw.ellipse([bx+56, by_btn, bx+68, by_btn+12], fill=(34, 197, 94))
    
    draw.text((bx+88, by+12), title, fill=C_TEXT_WHITE, font=f_title)
    if subtitle:
        sub_x = bx + 88 + int(draw.textlength(title, font=f_title)) + 12
        draw.text((sub_x, by+14), f"• {subtitle}", fill=C_TEXT_DIM, font=f_sm)
        
    bw_text = int(draw.textlength(badge_text, font=f_badge)) + 18
    bx_badge = bx + bw - bw_text - 18
    draw.rounded_rectangle([bx_badge, by+11, bx_badge+bw_text, by+31], radius=4, fill=(badge_color[0]//5, badge_color[1]//5, badge_color[2]//5), outline=badge_color, width=1)
    draw.text((bx_badge+9, by+15), badge_text, fill=badge_color, font=f_badge)
    
    stat_y = by + bh - 32
    draw.line([(bx, stat_y), (bx+bw, stat_y)], fill=(30, 41, 59), width=1)
    draw.rectangle([bx, stat_y+1, bx+bw, by+bh], fill=(16, 22, 32))
    
    return bx, by + header_h + 16, bw, stat_y

def draw_status_bar(draw, stat_y, left, right):
    draw.text((50, stat_y + 8), left, fill=C_TEXT_DIM, font=f_sm)
    rw = int(draw.textlength(right, font=f_sm))
    draw.text((1220 - rw, stat_y + 8), right, fill=C_BLUE, font=f_sm)

def draw_cmd_prompt(draw, x, y, directory, cmd):
    draw.text((x, y), "➜ ", fill=C_PROMPT, font=f_md_b)
    x += int(draw.textlength("➜ ", font=f_md_b))
    draw.text((x, y), directory, fill=C_CYAN, font=f_md_b)
    x += int(draw.textlength(directory, font=f_md_b))
    draw.text((x, y), " git:(", fill=C_TEXT_DIM, font=f_md)
    x += int(draw.textlength(" git:(", font=f_md))
    draw.text((x, y), "main", fill=C_PURPLE, font=f_md)
    x += int(draw.textlength("main", font=f_md))
    draw.text((x, y), ") ", fill=C_TEXT_DIM, font=f_md)
    x += int(draw.textlength(") ", font=f_md))
    draw.text((x, y), cmd, fill=C_YELLOW, font=f_md_b)

def draw_terminal_content(draw, start_x, start_y, lines, line_h=20):
    y = start_y
    for line in lines:
        if isinstance(line, list):
            cur_x = start_x
            for chunk in line:
                txt, col = chunk[0], chunk[1]
                bld = chunk[2] if len(chunk) > 2 else False
                f = f_md_b if bld else f_md
                draw.text((cur_x, y), txt, fill=col, font=f)
                cur_x += int(draw.textlength(txt, font=f))
        y += line_h

def render_showcase(pid, meta):
    img, draw = base_canvas()
    bx, content_y, bw, stat_y = draw_frame(
        draw, 
        meta["title"], 
        meta.get("subtitle", ""), 
        meta.get("badge", "● EXECUTED 0"), 
        meta.get("badge_color", C_GREEN)
    )
    
    # Prompt line
    draw_cmd_prompt(draw, bx + 24, content_y, meta.get("dir", f"~/{pid}"), meta.get("cmd", "./run"))
    
    # Execution lines
    draw_terminal_content(draw, bx + 24, content_y + 30, meta.get("lines", []))
    
    # Status bar
    draw_status_bar(
        draw, 
        stat_y, 
        meta.get("status_left", f"STATUS: EXITED 0 | CPU: 0.2ms | RSS: 2.4 MB | ARCH: x86_64"), 
        meta.get("status_right", "Linux 6.8 • glibc 2.39")
    )
    
    out_path = os.path.join(OUTPUT_DIR, f"{pid}.png")
    img.save(out_path, format="PNG", optimize=False, compress_level=1)
    return out_path
