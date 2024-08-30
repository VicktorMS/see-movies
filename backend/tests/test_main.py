def test_root(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "message": "Bem-vindo do projeto See Movie! 🚀 Para explorar e interagir com os endpoints disponíveis, visite a documentação interativa.",
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc"
        }
    }