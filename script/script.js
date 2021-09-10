//Обработчик событий, который отслеживает загрузку контента
document.addEventListener("DOMContentLoaded", function () {
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  const sendButton = document.querySelector("#send");

  //Объект содержащий вопросы и ответы
  const questions = [
    {
      question: "Какого цвета бургер?",
      answers: [
        {
          title: "Стандарт",
          url: "./image/burger.png",
        },
        {
          title: "Черный",
          url: "./image/burgerBlack.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Из какого мяса котлета?",
      answers: [
        {
          title: "Курица",
          url: "./image/chickenMeat.png",
        },
        {
          title: "Говядина",
          url: "./image/beefMeat.png",
        },
        {
          title: "Свинина",
          url: "./image/porkMeat.png",
        },
      ],
      type: "radio",
    },
    {
      question: "Дополнительные ингредиенты?",
      answers: [
        {
          title: "Помидор",
          url: "./image/tomato.png",
        },
        {
          title: "Огурец",
          url: "./image/cucumber.png",
        },
        {
          title: "Салат",
          url: "./image/salad.png",
        },
        {
          title: "Лук",
          url: "./image/onion.png",
        },
      ],
      type: "checkbox",
    },
    {
      question: "Добавить соус?",
      answers: [
        {
          title: "Чесночный",
          url: "./image/sauce1.png",
        },
        {
          title: "Томатный",
          url: "./image/sauce2.png",
        },
        {
          title: "Горчичный",
          url: "./image/sauce3.png",
        },
      ],
      type: "radio",
    },
  ];

  // Перебор массива answers

  // questions.answers.forEach((item, index, arr) => {
  // 	console.log(item);
  // 	console.log(index);
  // 	console.log(arr);
  // })

  // Обработчик событий открытия/закрытия модального окна
  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  // Функция запуска тестирования
  const playTest = () => {
    const finalAnswers = [];

    // Переменная номер вопроса
    let numbersQuestion = 0;

    // Функция рендоринга ответов
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");

        answerItem.classList.add(
          "answers-item",
          "d-flex",
          "justify-content-center"
        );

        answerItem.innerHTML = `
				<input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
				<label for="${answer.title}" class="d-flex flex-column justify-content-between">
					<img class="answerImg" src="${answer.url}" alt="burger">
					<span>${answer.title}</span>
				</label>
				`;
        formAnswers.appendChild(answerItem);
      });
    };

    // функции рендеринга вопросов + ответов
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = ""; // Очищаем форму

      // if (numbersQuestion == 0) {
      // 	prevButton.classList.add('d-none');
      // } else {
      // 	prevButton.classList.remove('d-none');
      // }

      // if (numbersQuestion == questions.length - 1) {
      // 	nextButton.classList.add('d-none');
      // } else {
      // 	nextButton.classList.remove('d-none');
      // }

      switch (true) {
        case numbersQuestion === 0:
          prevButton.classList.add("d-none");
          nextButton.classList.remove("d-none");
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          questionTitle.classList.remove("d-none");
          break;

        case numbersQuestion >= 0 && numbersQuestion <= questions.length - 1:
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          nextButton.classList.remove("d-none");
          prevButton.classList.remove("d-none");
          // sendButton.classList.add('d-none');
          questionTitle.classList.remove("d-none");
          break;

        case numbersQuestion === questions.length:
          nextButton.classList.add("d-none");
          prevButton.classList.add("d-none");
          sendButton.classList.remove("d-none");
          questionTitle.classList.add("d-none");

          formAnswers.innerHTML = `
					<div class="form-group">
						<label for="numberPhone">Введите номер телефона</label>
						<input type="phone" class="form-control" id="numberPhone">
					</div>`;
          break;

        case numbersQuestion === questions.length + 1:
          formAnswers.textContent = "Спасибо за пройденный тест!";
          sendButton.classList.add("d-none");
          setTimeout(() => {
            modalBlock.classList.remove("d-block");
          }, 2000);
          break;

        default:
          console.log("Что-то пошло не так");
      }

      // 	if (numbersQuestion >= 0 && numbersQuestion <= questions.length - 1) {
      // 	//Рендеринг вопроса
      // 	questionTitle.textContent = `${questions[indexQuestion].question}`;
      // 	//Рендеринг ответа
      // 	renderAnswers(indexQuestion);
      // 	nextButton.classList.remove('d-none');
      // 	prevButton.classList.remove('d-none');
      // 	sendButton.classList.add('d-none');
      // }

      // 	if (numbersQuestion === 0) {
      // 		prevButton.classList.add('d-none');
      // 	}

      // 	if (numbersQuestion === questions.length) {
      // 		nextButton.classList.add('d-none');
      // 		prevButton.classList.add('d-none');
      // 		sendButton.classList.remove('d-none');
      // 		formAnswers.innerHTML = `
      // 		<div class="form-group">
      // 			<label for="numberPhone">Введите номер телефона</label>
      // 			<input type="phone" class="form-control" id="numberPhone">
      // 		</div>
      // 		`;
      // 	}

      // 	if (numbersQuestion === questions.length + 1) {
      // 	formAnswers.textContent = "Спасибо за пройденный тест!";
      // 	setTimeout(() => {
      // 		modalBlock.classList.remove('d-block');
      // 	}, 2000);
      // 	}
    };

    //Запуск функции рендера
    renderQuestions(numbersQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter(
        (input) => input.checked || input.id === "numberPhone"
      );

      inputs.forEach((input, index) => {
        if (numbersQuestion >= 0 && numbersQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numbersQuestion].question}`] = input.value;
        }
        if (numbersQuestion === questions.length) {
          obj["Номер телефона"] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    //Обработчики событий кнопок next и prev
    nextButton.onclick = () => {
      checkAnswer();
      numbersQuestion++;
      renderQuestions(numbersQuestion);
    };

    prevButton.onclick = () => {
      numbersQuestion--;
      renderQuestions(numbersQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      console.log(finalAnswers);
      numbersQuestion++;
      renderQuestions(numbersQuestion);
    };
  };
});
