document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    slotMinTime: '06:00',
    slotMaxTime: '24:00',
    allDaySlot: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    events: []  // Inicialmente no hay eventos
  });
  calendar.render();

  // Cuando se envía el formulario
  document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Evita el envío del formulario
    generateSchedule(calendar);  // Generar el horario
  });
});

// Función para generar el horario basado en los valores del formulario
function generateSchedule(calendar) {
  // Limpiar todos los eventos existentes
  calendar.removeAllEvents();

  // Obtener los valores del formulario
  var classStart = document.getElementById('classStart').value;
  var classEnd = document.getElementById('classEnd').value;
  var sleepHours = parseInt(document.getElementById('sleepHours').value);
  var breakfastTime = document.getElementById('breakfastTime').value;
  var lunchTime = document.getElementById('lunchTime').value;
  var dinnerTime = document.getElementById('dinnerTime').value;
  var studyHours = parseInt(document.getElementById('studyHours').value);
  var recreationTime = parseFloat(document.getElementById('recreationTime').value);
  var choresTime = parseFloat(document.getElementById('choresTime').value);

  // Generar eventos para cada día de la semana (Lunes a Viernes)
  for (var i = 1; i <= 5; i++) {
    var day = new Date();
    day.setDate(day.getDate() + i - day.getDay());  // Calcular el día correspondiente

    // Evento de Clases
    calendar.addEvent({
      title: 'Clases',
      start: day.toISOString().split('T')[0] + 'T' + classStart,
      end: day.toISOString().split('T')[0] + 'T' + classEnd,
      color: '#3498db'
    });

    // Evento de Desayuno
    calendar.addEvent({
      title: 'Desayuno',
      start: day.toISOString().split('T')[0] + 'T' + breakfastTime,
      end: day.toISOString().split('T')[0] + 'T' + addMinutes(breakfastTime, 30),
      color: '#2ecc71'
    });

    // Evento de Almuerzo
    calendar.addEvent({
      title: 'Almuerzo',
      start: day.toISOString().split('T')[0] + 'T' + lunchTime,
      end: day.toISOString().split('T')[0] + 'T' + addMinutes(lunchTime, 60),
      color: '#2ecc71'
    });

    // Evento de Cena
    calendar.addEvent({
      title: 'Cena',
      start: day.toISOString().split('T')[0] + 'T' + dinnerTime,
      end: day.toISOString().split('T')[0] + 'T' + addMinutes(dinnerTime, 60),
      color: '#2ecc71'
    });

    // Evento de Estudio
    var studyStart = addMinutes(classEnd, 60);  // 1 hora después de terminar las clases
    calendar.addEvent({
      title: 'Estudio',
      start: day.toISOString().split('T')[0] + 'T' + studyStart,
      end: day.toISOString().split('T')[0] + 'T' + addMinutes(studyStart, studyHours * 60),
      color: '#9b59b6'
    });

    // Evento de Recreación
    var recreationStart = addMinutes(studyStart, studyHours * 60 + 30);  // 30 minutos después de estudiar
    calendar.addEvent({
      title: 'Recreación',
      start: day.toISOString().split('T')[0] + 'T' + recreationStart,
      end: day.toISOString().split('T')[0] + 'T' + addMinutes(recreationStart, recreationTime * 60),
      color: '#f1c40f'
    });

    // Evento de Tareas Domésticas
    var choresStart = addMinutes(recreationStart, recreationTime * 60 + 30);  // 30 minutos después de la recreación
    calendar.addEvent({
      title: 'Tareas Domésticas',
      start: day.toISOString().split('T')[0] + 'T' + choresStart,
      end: day.toISOString().split('T')[0] + 'T' + addMinutes(choresStart, choresTime * 60),
      color: '#e67e22'
    });

    // Evento de Dormir
    var sleepStart = '22:00';  // Asumimos que el estudiante se acuesta a las 10 PM
    calendar.addEvent({
      title: 'Dormir',
      start: day.toISOString().split('T')[0] + 'T' + sleepStart,
      end: addDays(day, 1).toISOString().split('T')[0] + 'T' + addMinutes('00:00', sleepHours * 60),
      color: '#34495e'
    });
  }
}

// Función para añadir minutos a una hora específica
function addMinutes(time, minutes) {
  var date = new Date('2000-01-01T' + time);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toTimeString().slice(0, 5);
}

// Función para sumar días a una fecha
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
