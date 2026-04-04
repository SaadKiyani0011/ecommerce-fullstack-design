import os
import re

template_dir = r"C:\Users\saadk\Desktop\Web Dev Intern\backend\templates"

for filename in os.listdir(template_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(template_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace href="assets/..."
        content = re.sub(r'href="assets/(.*?)"', r'href="{% static \'assets/\1\' %}"', content)
        content = re.sub(r"href='assets/(.*?)'", r"href='{% static \'assets/\1\' %}'", content)
        
        # Replace src="assets/..."
        content = re.sub(r'src="assets/(.*?)"', r'src="{% static \'assets/\1\' %}"', content)
        content = re.sub(r"src='assets/(.*?)'", r"src='{% static \'assets/\1\' %}'", content)
        
        # Add {% load static %} if not present
        if '{% load static %}' not in content:
            content = '{% load static %}\n' + content
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Conversion complete.")
