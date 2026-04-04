import os

template_dir = r"C:\Users\saadk\Desktop\Web Dev Intern\backend\templates"

for filename in os.listdir(template_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(template_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace \' with '
        content = content.replace("\\'", "'")
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Fix complete.")
