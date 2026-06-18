from datetime import datetime

from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static"
)

templates = Jinja2Templates(directory="templates")

usuarios = {

    "1032018910": {
        "password": "1234",
        "rol": "estudiante"
    },

    "1032018999": {
        "password": "12345",
        "rol": "profesor"
    }

}

@app.get("/", response_class=HTMLResponse)
async def inicio_sesion(request : Request):
    return templates.TemplateResponse(
        name="inicio_sesion.html",
        request=request,
    )

@app.post("/login")
async def login(
    documento: str = Form(...),
    password: str = Form(...)
):
    if documento in usuarios:
        if usuarios[documento]["password"] == password:
            rol = usuarios[documento]["rol"]
            if rol == "estudiante":
                return RedirectResponse(
                    url="/inicio",
                    status_code=303
                )
            
            elif rol == "profesor":
                return RedirectResponse(
                    url="/profesores",
                    status_code=303
                )
            
estudiantes = {
    
    "1234567891" : {
        "nombre" : "Juanito Pérez ",
        "grado" : "10°3",
        "horas_completadas" : 20,
        "horas_totales" : 40
    },

    "1122334455" : {
        "nombre" : "Sebastian Rodriguez",
        "grado" : "11°5",
        "horas_completadas" : 15,
        "horas_totales" : 40
    },

    "1566778899" : {
        "nombre" : "Luciana Gallego",
        "grado" : "10°1",
        "horas_completadas" : 10,
        "horas_totales" : 80
    },

    "1526375469" : {
        "nombre" : "Juan José Castro",
        "grado" : "11°1",
        "horas_completadas" : 25,
        "horas_totales" : 80
    },

    "1562385548" : {
        "nombre" : "Miguel Morales",
        "grado" : "10°4",
        "horas_completadas" : 6,
        "horas_totales" : 40
    },

    "1030225967" : {
        "nombre" : "Alexander Valencia",
        "grado" : "10°5",
        "horas_completadas" : 30,
        "horas_totales" : 40
    },

    "1253719519" : {
        "nombre" : "Luciana Gallego",
        "grado" : "11°4",
        "horas_completadas" : 5,
        "horas_totales" : 40
    }
    
}

@app.get("/api/estudiantes")
async def obtener_estudiantes():
    lista = []

    for documento, datos in estudiantes.items():
        lista.append({
            "documento": documento,
            "nombre": datos["nombre"],
            "grado": datos["grado"]
        })
    return lista
            

@app.get("/inicio", response_class=HTMLResponse)
async def inicio(request : Request):
    return templates.TemplateResponse(
        name="inicio.html",
        request=request,
    )

@app.get("/disponibles", response_class=HTMLResponse)
async def pro_disp(request : Request):
    return templates.TemplateResponse(
        name="proyectos_disposnibles.html",
        request=request,
    )

@app.get("/horas_es", response_class=HTMLResponse)
async def horas_es(request : Request):
    return templates.TemplateResponse(
        name="horas_estudiante.html",
        request=request,
    )

@app.get("/profesores", response_class=HTMLResponse)
async def profesores(request : Request):
    return templates.TemplateResponse(
        name="registrar.html",
        request=request,
    )

@app.get("/g_proyectos", response_class=HTMLResponse)
async def g_proyectos(request : Request):
    return templates.TemplateResponse(
        name="gestion_proyecto.html",
        request=request,
    )

@app.get("/notificaciones", response_class=HTMLResponse)
async def noti(request : Request):
    return templates.TemplateResponse(
        name="Noti_profe.html",
        request=request,
    )

@app.get("/mis_proyectos", response_class=HTMLResponse)
async def m_proyect(request : Request):
    return templates.TemplateResponse(
        name="mis-proyectos.html",
        request=request,
    )
