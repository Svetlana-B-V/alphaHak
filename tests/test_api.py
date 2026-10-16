from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_docs_available():
    assert client.get("/docs").status_code == 200


def test_list_news_returns_mock_with_insights():
    response = client.get("/api/v1/news")
    assert response.status_code == 200
    news = response.json()
    assert len(news) > 0
    insight = news[0]["insights"][0]
    for field in ("event", "impact", "recommendation", "importance_score", "confidence_score"):
        assert field in insight


def test_list_news_sorted_by_importance():
    news = client.get("/api/v1/news").json()
    scores = [max(i["importance_score"] for i in n["insights"]) for n in news]
    assert scores == sorted(scores, reverse=True)


def test_get_news_by_id():
    assert client.get("/api/v1/news/1").json()["id"] == 1
    assert client.get("/api/v1/news/999").status_code == 404


def test_feedback_accepted():
    response = client.post("/api/v1/feedback", json={"news_id": 1, "insight_id": 1, "is_like": True})
    assert response.status_code == 201
    body = response.json()
    assert body["news_id"] == 1 and body["is_like"] is True and "id" in body


def test_feedback_validation():
    # Неверный тип поля
    assert client.post("/api/v1/feedback", json={"news_id": 1, "is_like": "abc"}).status_code == 422
    # Несуществующая новость и чужой вывод
    assert client.post("/api/v1/feedback", json={"news_id": 999, "is_like": True}).status_code == 404
    assert client.post("/api/v1/feedback", json={"news_id": 1, "insight_id": 2, "is_like": True}).status_code == 404


def test_analyze_returns_insight():
    response = client.post("/api/v1/analyze", json={"title": "ЦБ снизил ключевую ставку", "content": "Решение совета директоров"})
    assert response.status_code == 200
    assert response.json()["importance_score"] == 8


def test_analyze_noise_and_validation():
    noise = client.post("/api/v1/analyze", json={"title": "Apple показала iPhone", "content": "Новая линейка"})
    assert noise.json()["importance_score"] == 1
    assert client.post("/api/v1/analyze", json={"title": "", "content": "текст"}).status_code == 422


def test_analyze_matches_whole_word_start():
    # "поставку" содержит "ставк", но это не новость про ставку ЦБ
    response = client.post("/api/v1/analyze", json={
        "title": "Санкции против поставщиков серверов",
        "content": "Ограничения на поставку оборудования",
    })
    assert response.json()["importance_score"] == 7


def test_cors_allows_frontend_only():
    preflight = {"Access-Control-Request-Method": "GET"}
    allowed = client.options("/api/v1/news", headers={"Origin": "http://localhost:5173", **preflight})
    assert allowed.headers.get("access-control-allow-origin") == "http://localhost:5173"
    denied = client.options("/api/v1/news", headers={"Origin": "http://evil.example", **preflight})
    assert "access-control-allow-origin" not in denied.headers
