import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import WeekDaysNames from '../../components/WeekDaysNames'
import WeekRow from '../../components/WeekRow'

import './styles.scss'

export default function Month(){
  const { monthDisplay } = useParams()
  const [ monthName, year] = monthDisplay?monthDisplay.split(' '):['', '-1']
  const currentMonth = moment().month(monthName).year(Number(year))
  const weekDaysNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const startDayOfCard = currentMonth.clone().startOf('month').startOf('week')
  const endDayOfCard = currentMonth.clone().endOf('month').startOf('week')
  const day = startDayOfCard.clone().subtract(1, 'day')
  const weeksOfMonth = []
  const currentDay = moment()

  const isSameMonth = (day: moment.Moment, month: moment.Moment): boolean => {
    if(day.format('MMMM') == month.format('MMMM'))
      return true
    else
      return false
  }

  const getWeekIndex = (daysOfWeek: moment.Moment[]): number => {
    for (let index=0; index < daysOfWeek.length; index++){
      if(isSameMonth(daysOfWeek[index], currentMonth))
        return Number(daysOfWeek[index].format('W'))
    }
    return Number(daysOfWeek[0].format('W'))
  }

  const navigate = useNavigate()

  while(day.isBefore(endDayOfCard, 'day')){
    weeksOfMonth.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    )
  }

  return (
    <div className='Month'>
      <div className='MonthNameContainer'>
        <h1>{currentMonth.format('MMMM YYYY')}</h1>
      </div>

      <div className='MonthDaysContainer'>
        <WeekDaysNames daysNames={weekDaysNames} currentYear={Number(year)} monthName={monthName}/>

        {
          weeksOfMonth.map((week, index) => (
            <WeekRow key={`year${Number(year)}month${monthName}week${index.toString()}`} currentYear={Number(year)} month={currentMonth} days={week} index={index} currentDay={currentDay} onClickWeek={()=>{
              navigate(`/week/${getWeekIndex(week)} ${currentMonth.format('MMMM YYYY')}`)
            }}/>
          ))
        }
      </div>
    </div>
  )
}