#!/usr/bin/env python3
"""批量重命名奶蛙图片文件"""
import os
import re

IMAGES_DIR = r"D:\LEARN\AI\programs\PythonTask\NAIWA\images"

# 已有描述性名称的文件，保留不变
KEEP_NAMES = {
    'idle', 'jumping', 'running', 'running-left', 'running-right',
    'waiting', 'waving', 'failed', 'review'
}

def should_keep(filename):
    """检查文件名是否已有描述性名称"""
    base = os.path.splitext(filename)[0]
    for prefix in KEEP_NAMES:
        if base.startswith(prefix):
            return True
    return False

def get_extension(filename):
    """获取文件扩展名"""
    _, ext = os.path.splitext(filename)
    return ext.lower()

def rename_images():
    files = sorted(os.listdir(IMAGES_DIR))

    # 分离需要重命名的文件和保留的文件
    to_rename = []
    kept = []

    for f in files:
        full_path = os.path.join(IMAGES_DIR, f)
        if not os.path.isfile(full_path):
            continue
        if should_keep(f):
            kept.append(f)
        else:
            to_rename.append(f)

    print(f"总文件数: {len(files)}")
    print(f"保留原名: {len(kept)}")
    print(f"需要重命名: {len(to_rename)}")
    print()

    # 按扩展名分组统计
    ext_count = {}
    for f in to_rename:
        ext = get_extension(f)
        ext_count[ext] = ext_count.get(ext, 0) + 1

    print("按文件类型统计:")
    for ext, count in sorted(ext_count.items()):
        print(f"  {ext}: {count} 张")
    print()

    # 批量重命名
    counter = 1
    rename_map = {}

    for f in to_rename:
        ext = get_extension(f)
        new_name = f"奶蛙{counter:04d}{ext}"
        rename_map[f] = new_name
        counter += 1

    # 执行重命名
    print("开始重命名...")
    success = 0
    errors = 0

    for old_name, new_name in rename_map.items():
        old_path = os.path.join(IMAGES_DIR, old_name)
        new_path = os.path.join(IMAGES_DIR, new_name)

        try:
            os.rename(old_path, new_path)
            success += 1
        except Exception as e:
            print(f"  错误: {old_name} -> {new_name}: {e}")
            errors += 1

    print(f"\n重命名完成!")
    print(f"  成功: {success}")
    print(f"  失败: {errors}")
    print(f"  保留原名: {len(kept)}")

    # 输出重命名映射到文件
    mapping_file = os.path.join(os.path.dirname(IMAGES_DIR), "rename_mapping.txt")
    with open(mapping_file, 'w', encoding='utf-8') as f:
        f.write("# 奶蛙图片重命名映射\n")
        f.write("# 旧文件名 -> 新文件名\n\n")
        for old_name, new_name in sorted(rename_map.items()):
            f.write(f"{old_name} -> {new_name}\n")

    print(f"\n重命名映射已保存到: {mapping_file}")

if __name__ == "__main__":
    rename_images()
