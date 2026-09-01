#!/usr/bin/env python3
"""将所有页面模块间距放大1.5倍（Tailwind 间距类）"""
import re
import glob

# 只处理页面文件和影响布局的组件
FILES = (
    glob.glob('frontend/src/views/*.vue')
    + ['frontend/src/App.vue', 'frontend/src/components/ui/SectionTitle.vue']
)

# 匹配间距类：py-24 / mb-12 / gap-8 / space-y-4 / md:gap-6 等
# (?<![-\w]) 防止匹配负边距 -mt-8 和标识符内部
PATTERN = re.compile(r'(?<![-\w])(py|pt|pb|mb|mt|gap|space-y|space-x)-(\d+(?:\.\d+)?)\b')


def scale(match):
    prop, num = match.group(1), float(match.group(2))
    new_num = round(num * 1.5 * 2) / 2  # 保留0.5步长
    # 整数则去掉小数点
    new_str = str(int(new_num)) if new_num == int(new_num) else str(new_num)
    return f'{prop}-{new_str}'


total_changes = 0
for path in FILES:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content, n = PATTERN.subn(scale, content)
    if n > 0 and new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'{path}: {n} 处间距已放大1.5倍')
        total_changes += n

print(f'\n完成！共修改 {total_changes} 处')
