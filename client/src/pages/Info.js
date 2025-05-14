import React from 'react';

function Info() {
  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16">
      <div className="max-w-4xl mx-auto bg-[#fff9f7] p-8 rounded-2xl shadow-md">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#5E2B2B]">📚 Корисна інформація</h2>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-[#7c2d2d] mb-2">1. Основи контролю рівня глюкози</h3>
          <p className="text-[#4b3b3b]">
            Контроль рівня глюкози в крові — ключовий компонент для людей із цукровим діабетом. Регулярне вимірювання
            дозволяє відстежувати зміни та запобігати ускладненням. Важливо знати свої межі та динаміку змін упродовж дня.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-[#7c2d2d] mb-2">2. Харчові рекомендації</h3>
          <ul className="list-disc pl-6 text-[#4b3b3b] space-y-1">
            <li>Уникайте продуктів із високим глікемічним індексом</li>
            <li>Вживайте більше овочів, цільнозернових продуктів та білків</li>
            <li>Контролюйте порції та частоту прийомів їжі</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-[#7c2d2d] mb-2">3. Вплив фізичної активності</h3>
          <p className="text-[#4b3b3b]">
            Помірна фізична активність сприяє зниженню рівня глюкози. Рекомендується 30 хвилин ходьби, йоги або іншої активності
            щодня. Уважно слідкуйте за рівнем цукру перед та після занять.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#7c2d2d] mb-4">4. Нормальні рівні глюкози для різних вікових груп</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-[#d8b4a0] bg-white text-[#4b3b3b] rounded-lg">
              <thead className="bg-[#7c2d2d] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Вік</th>
                  <th className="py-3 px-4 text-left">Норма натще (мг/дл)</th>
                  <th className="py-3 px-4 text-left">Після їжі (мг/дл)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#f1d4d4]">
                  <td className="py-2 px-4">Діти (до 14 років)</td>
                  <td className="py-2 px-4">70–100</td>
                  <td className="py-2 px-4">до 140</td>
                </tr>
                <tr className="border-t border-[#f1d4d4]">
                  <td className="py-2 px-4">Дорослі (15–60 років)</td>
                  <td className="py-2 px-4">70–99</td>
                  <td className="py-2 px-4">до 140</td>
                </tr>
                <tr className="border-t border-[#f1d4d4]">
                  <td className="py-2 px-4">Старші 60 років</td>
                  <td className="py-2 px-4">80–110</td>
                  <td className="py-2 px-4">до 150</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Info;
