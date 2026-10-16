"""Запуск всего проекта одной командой (бэкенд + фронтенд).

    .venv\\Scripts\\activate
    python run.py

Сайт: http://localhost:5173. Остановить всё: Ctrl+C.
"""
import shutil
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).parent


def fail(message: str) -> None:
    print(f"\n[run.py] {message}\n")
    sys.exit(1)


def main() -> None:
    # Проверяем, что всё установлено, и подсказываем, что делать, если нет
    try:
        import uvicorn  # noqa: F401
    except ImportError:
        fail("Нет зависимостей бэкенда. Активируйте окружение (.venv\\Scripts\\activate) "
             "и выполните: pip install -r requirements.txt")

    npm = shutil.which("npm")
    if npm is None:
        fail("Не найден npm. Установите Node.js и перезапустите терминал.")
    if not (ROOT / "node_modules").exists():
        fail("Нет зависимостей фронтенда. Выполните: npm install")

    # Создаём/обновляем таблицы БД
    subprocess.run([sys.executable, "-m", "alembic", "upgrade", "head"], cwd=ROOT, check=True)

    backend = subprocess.Popen([sys.executable, "-m", "uvicorn", "app.main:app", "--reload"], cwd=ROOT)
    frontend = subprocess.Popen([npm, "run", "dev"], cwd=ROOT)
    processes = [backend, frontend]

    print("\n[run.py] Сайт:        http://localhost:5173")
    print("[run.py] Swagger API: http://127.0.0.1:8000/docs")
    print("[run.py] Остановить:  Ctrl+C\n")

    try:
        # Если один из серверов упал - останавливаем и второй
        while all(p.poll() is None for p in processes):
            time.sleep(0.5)
        print("\n[run.py] Один из серверов остановился, выключаю второй.")
    except KeyboardInterrupt:
        print("\n[run.py] Останавливаю серверы...")
    finally:
        for p in processes:
            if p.poll() is None:
                p.terminate()
        for p in processes:
            try:
                p.wait(timeout=10)
            except subprocess.TimeoutExpired:
                p.kill()


if __name__ == "__main__":
    main()
