import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import LiveBackground from '../components/LiveBackground';
import ConnectedStats from '../components/ConnectedStats';
import Button from '../components/Button';
import Card, { CardTitle, CardDescription } from '../components/Card';
import Badge from '../components/Badge';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <LiveBackground />
      <Navbar />

      {/* Многослойный Hero-блок в стиле yaintern + референса 2 */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-6 pb-16">
        <div className="bg-white/90 backdrop-blur-md rounded-[40px] border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
          {/* Верхняя расколотая типографика как на 2 фото */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 text-text-primary text-xs font-bold mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                YANDEX INSIGHT RADAR v0.2
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-display tracking-tight text-text-primary leading-[0.95]">
                Управляй
                <span className="block text-secondary">ИНСАЙТАМИ</span>
              </h1>
            </div>

            <div className="md:text-right">
              <div className="text-primary text-2xl mb-1">✦</div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-none">
                ДЕЙСТВУЙ
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  НА ОПЕРЕЖЕНИЕ
                </span>
              </div>
            </div>
          </div>

          {/* Внутренний цветной многослойный контейнер (как фиолетовый блок на 2 фото) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="gradient-bg rounded-[32px] p-6 md:p-10 text-white relative overflow-hidden shadow-lg"
          >
            {/* Абстрактные декоративные круги внутри */}
            <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute right-1/4 -bottom-20 w-72 h-72 rounded-full bg-black/15 blur-2xl pointer-events-none" />

            <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold border border-white/30">
                  ✦ AI-аналитика для топ-менеджмента Яндекса
                </div>

                <h2 className="text-2xl md:text-4xl font-extrabold font-display leading-tight">
                  От сырого потока новостей — к персональным решениям за секунды
                </h2>

                <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed">
                  ИИ-агент фильтрует информационный шум, оценивает влияние событий на
                  долговую нагрузку, цепочки поставок и регуляторные риски Яндекса и
                  предлагает готовые шаги.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link to="/dashboard">
                    <button className="px-6 py-3.5 rounded-full bg-gray-900 text-white font-bold text-sm inline-flex items-center gap-3 hover:bg-black transition-all shadow-lg cursor-pointer">
                      <span>Открыть соты инсайтов</span>
                      <span className="w-6 h-6 rounded-full border border-white/40 inline-flex items-center justify-center text-xs">
                        →
                      </span>
                    </button>
                  </Link>

                  <Link to="/analyze">
                    <button className="px-6 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm border border-white/40 transition-all cursor-pointer">
                      Проверить свою новость
                    </button>
                  </Link>
                </div>

                {/* Плавающая стеклянная капсула снизу слева (как на 2 фото) */}
                <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 mt-2">
                  <div className="flex -space-x-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      CEO
                    </span>
                    <span className="w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      CFO
                    </span>
                    <span className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                      AI
                    </span>
                  </div>
                  <div className="text-xs leading-tight">
                    <div className="font-bold">Фокус на главном</div>
                    <div className="text-white/80">Оценка важности от 1 до 10</div>
                  </div>
                </div>
              </div>

              {/* Многослойная карточка-превью справа (как карточка товара на 2 фото + графика с 1 фото) */}
              <div className="md:col-span-5">
                <div className="bg-white text-text-primary rounded-[28px] p-6 shadow-2xl border border-white/60 relative">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="error">Критично · 9/10</Badge>
                    <span className="text-xs font-bold text-text-hint">LIVE PREVIEW</span>
                  </div>
                  <div className="font-extrabold font-display text-lg mb-2">
                    Снижение ключевой ставки ЦБ
                  </div>
                  <p className="text-xs text-text-secondary mb-4">
                    Часть долга с плавающей ставкой дешевеет, открывается окно для рефинансирования.
                  </p>
                  <div className="p-3 rounded-2xl bg-gray-50 border border-border text-xs font-medium mb-4">
                    <span className="text-primary font-bold block mb-0.5">
                      ✦ Рекомендация ИИ:
                    </span>
                    Казначею: оценить рефинансирование через кредитную линию.
                  </div>
                  <Link to="/dashboard" className="block">
                    <Button variant="secondary" size="sm" className="w-full">
                      Перейти к полному отчёту →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция с абстрактными соединёнными блоками (как на 3 фото) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="text-center mb-8">
          <Badge variant="info" className="mb-2">✦ Архитектура решения</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-text-primary">
            Синергия данных и ИИ
          </h2>
        </div>

        <ConnectedStats
          stats={[
            {
              value: '10',
              suffix: '/10',
              label: 'Шкала скоринга критичности новостей для мгновенного отсева информационного шума',
            },
            {
              value: '100%',
              label: 'Привязка каждого вывода к профилю Яндекса: финансы, облака, e-com и инфраструктура',
            },
            {
              value: '24/7',
              label: 'Мониторинг и онлайн-анализ через ИИ-агента',
            },
          ]}
        />
      </section>

      {/* Многослойные карточки преимуществ (в стиле 1 референса) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <Card hoverable>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-xl shadow-md">
                01
              </div>
              <span className="text-primary text-lg">✦</span>
            </div>
            <CardTitle>Сотовая матрица</CardTitle>
            <CardDescription>
              Удобное расположение инсайтов в форме пчелиных сот позволяет охватить взглядом сразу все критичные сигналы.
            </CardDescription>
          </Card>

          <Card hoverable>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-text-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
                02
              </div>
              <span className="text-secondary text-lg">✦</span>
            </div>
            <CardTitle>ИИ-Агент в 1 клик</CardTitle>
            <CardDescription>
              Вставьте любой пресс-релиз или законопроект и получите расчёт влияния на бизнес и готовую рекомендацию.
            </CardDescription>
          </Card>

          <Card hoverable>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white font-bold text-xl shadow-md">
                03
              </div>
              <span className="text-primary text-lg">✦</span>
            </div>
            <CardTitle>Обратная связь</CardTitle>
            <CardDescription>
              Оценивайте полезность выводов лайком или дизлайком — система адаптируется под приоритеты руководителя.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white/80 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-text-primary">
            © 2026 Яндекс · Инсайт-Радар
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-text-secondary">
            Young & Yandex Style · v0.2.0
          </span>
        </div>
      </footer>
    </div>
  );
}