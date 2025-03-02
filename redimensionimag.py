import os
from PIL import Image

ruta_origen = "img/"
ruta_destino = "img/optimizadas/"
os.makedirs(ruta_destino, exist_ok=True)

print("Carpeta creada exitosamente.")

# Tamaños a generar
tamaños = [400, 800, 1200]

# Lista de imágenes a procesar
imagenes = ["zapatos.webp", "chaqueta.webp", "camisa.webp", "jean2.webp", "correa.webp", "billetera.webp"]

for img_nombre in imagenes:
    img_ruta = os.path.join(ruta_origen, img_nombre)
    print(f"Procesando: {img_ruta}")


    # Verificar si la imagen existe
    if not os.path.exists(img_ruta):
        print(f"⚠️ Advertencia: {img_nombre} no existe en {ruta_origen}")
        continue

    # Abrir imagen
    with Image.open(img_ruta) as img:
        for ancho in tamaños:
            nuevo_alto = int(img.height * (ancho / img.width))
            img_redimensionada = img.resize((ancho, nuevo_alto))

            # Construir nombre del archivo
            nombre_base = img_nombre.split('.')[0]
            nueva_ruta = os.path.join(ruta_destino, f"{nombre_base}-{ancho}w.webp")

            # Guardar imagen optimizada
            img_redimensionada.save(nueva_ruta, "WEBP")
            print(f"✅ Guardado: {nueva_ruta}")

print("🎉 Imágenes optimizadas y guardadas en 'img/optimizadas/'")
