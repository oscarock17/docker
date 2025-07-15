
# 🐳 Comandos Útiles de Docker con Descripción

Este documento contiene una recopilación extensa y organizada de comandos para trabajar con Docker. Cada comando tiene una breve descripción.

---

## 📦 Instalación y gestión de Docker

```
systemctl status docker         # Verifica el estado del servicio Docker
systemctl start docker          # Inicia el servicio Docker
systemctl enable docker         # Habilita Docker para que inicie con el sistema
systemctl stop docker           # Detiene el servicio Docker
sudo docker version             # Muestra la versión instalada de Docker
dockerd                        # Inicia el daemon de Docker manualmente
```

---

## 🧱 Comandos básicos de contenedores

```
docker <command> --help             # Muestra la ayuda de un comando específico
docker images                       # Lista las imágenes disponibles localmente
docker ps                           # Lista los contenedores en ejecución
docker ps -a                        # Lista todos los contenedores (activos e inactivos)
docker ps -l                        # Muestra el último contenedor usado
docker ps -n 4                      # Muestra los últimos 4 contenedores
docker ps -a -q                     # Muestra solo los IDs de todos los contenedores
docker ps -a -s                     # Muestra el tamaño de los contenedores
docker ps -a -f <filtro>            # Filtra contenedores según condiciones

docker run ubuntu                   # Ejecuta un contenedor con la imagen Ubuntu
docker run --name <nombre> <img>   # Asigna un nombre al contenedor
docker run -it <img>               # Ejecuta contenedor en modo interactivo
docker run -d <img>                # Ejecuta en segundo plano (detached)
docker run --rm <img>              # Elimina el contenedor al detenerse
docker run -d <img>:<tag>          # Ejecuta una imagen con un tag específico

docker stop <id|nombre>            # Detiene un contenedor
docker kill <id|nombre>            # Fuerza la detención de un contenedor
docker rm <id|nombre>              # Elimina un contenedor
docker rmi <id_img>                # Elimina una imagen
docker rm $(docker ps -aq)         # Elimina todos los contenedores
docker rm $(docker ps -a -q -f status=exited) # Elimina los contenedores detenidos

docker exec <id|nombre> cmd        # Ejecuta un comando dentro del contenedor
docker exec -it <nombre> bash      # Accede al contenedor con bash
docker logs <id>                   # Muestra los logs del contenedor
docker top <id>                    # Muestra los procesos dentro del contenedor
docker stats <id>                  # Muestra estadísticas en tiempo real
docker inspect <id|nombre>         # Muestra detalles del contenedor
```

---

## 🌍 Redes en Docker

```
docker run -p 9000:80 httpd                     # Mapea el puerto 9000 del host al 80 del contenedor
docker network ls                               # Lista las redes Docker
docker port <contenedor>                        # Muestra los puertos expuestos del contenedor
docker network create <nombre>                  # Crea una red bridge por defecto
docker network create --subnet=X ...            # Crea una red con subred específica
docker network connect <red> <contenedor>       # Conecta un contenedor a una red
docker network disconnect <red> <contenedor>    # Desconecta un contenedor de una red
docker network inspect <red>                    # Muestra información de la red
docker image inspect <img>                      # Inspecciona detalles de la imagen
docker network rm <nombre>                      # Elimina una red
```

---

## 📂 Volúmenes y persistencia de datos

```
docker volume ls                                 # Lista todos los volúmenes
docker volume create <nombre>                    # Crea un volumen con nombre
docker volume inspect <nombre>                   # Muestra detalles del volumen
docker volume rm <nombre>                        # Elimina un volumen
docker volume prune                              # Elimina todos los volúmenes sin uso

docker run -v vol:/ruta ubuntu                   # Asocia un volumen al contenedor
docker run --volumes-from <otro> ubuntu          # Comparte volumen de otro contenedor
docker run -v /ruta/local:/ruta/contenedor ubuntu # Usa un directorio local (bind mount)
docker run -d -it --tmpfs /datos ubuntu          # Usa almacenamiento temporal en memoria
```

---

## 🔐 Variables de entorno

```
docker run -e VAR=valor imagen                   # Define variables de entorno
docker exec -it <nombre> bash                    # Accede al contenedor para verlas
env                                              # Lista variables de entorno
echo $VAR                                        # Muestra una variable específica
docker run --env-file=archivo.env imagen         # Carga variables desde archivo
```

---

## 📸 Imágenes

```
docker diff <contenedor>                         # Cambios en contenedor (A/C/D)
docker commit <contenedor> nueva_img             # Crea imagen desde contenedor
docker build -t nombre .                         # Crea imagen desde Dockerfile
docker image history <img>                       # Historial de capas
docker login                                     # Login a Docker Hub
docker push usuario/img                          # Sube imagen a repositorio
docker image save imagen -o archivo.tar          # Guarda imagen en archivo
docker image load -i archivo.tar                 # Carga imagen desde archivo
docker search nginx                              # Busca imagen en Docker Hub
```

---

## 🔄 Docker Registry

```
docker run -d --name registry -p 5000:5000 registry:2           # Inicia un registro local
docker tag img localhost:5000/img                               # Etiqueta imagen para subirla
docker push localhost:5000/img                                  # Sube la imagen local al registro
docker pull localhost:5000/img                                  # Descarga la imagen
docker run -d -v /registro:/var/lib/registry registry:2         # Registro con volumen persistente
```

---

## 📊 Gestión del sistema

```
docker system info                        # Información del sistema Docker
docker system df                          # Espacio utilizado por imágenes y volúmenes
docker system events                      # Muestra eventos del sistema
docker system prune                       # Limpia recursos no usados
```

---

## 📄 Copiar archivos entre host y contenedor

```
docker cp archivo.txt contenedor:/ruta   # Copia desde host al contenedor
docker cp contenedor:/ruta archivo.txt   # Copia desde contenedor al host
```

---

## ⚙️ Recursos (CPU y memoria)

```
docker run -m 12m imagen                  # Limita la memoria
docker run -m 256m --memory-swap 1G img  # Memoria + swap
docker run --cpus=0.5 imagen              # Limita uso de CPU
docker run --cpu-shares=1024 imagen      # Prioridad de CPU
```

---

## 🔁 Políticas de reinicio

```
docker run --restart always imagen        # Siempre se reinicia
docker run --restart unless-stopped img   # Reinicia menos si se detuvo manualmente
docker run --restart on-failure:2 img     # Reinicia hasta 2 veces si falla
docker inspect contenedor | grep RestartCount # Revisa cuántas veces reinició
```

---

## 📝 Logs avanzados

```
docker run --log-driver json-file --log-opt max-size=1m imagen
docker inspect contenedor | grep logConfig
docker run --log-driver=journald imagen
journald CONTAINER_NAME=nombre
```

---

## ⚙️ Docker Compose

```
docker compose up                         # Inicia servicios
docker compose ps                         # Lista contenedores del proyecto
docker compose stop                       # Detiene servicios
docker compose start                      # Arranca servicios detenidos
docker compose down                       # Detiene y elimina todo
docker compose ls                         # Lista proyectos
docker compose images                     # Imágenes del proyecto
docker compose logs                       # Logs de servicios
docker compose exec servicio bash         # Acceder a servicio
docker compose -f archivo.yml up -d       # Usar archivo YAML personalizado
docker compose --profile desarrollo up    # Perfiles de entorno
```

---

✅ **Tip**: Usa este archivo como guía rápida para practicar y administrar entornos Docker.

📚 Documentación: [https://docs.docker.com](https://docs.docker.com)
