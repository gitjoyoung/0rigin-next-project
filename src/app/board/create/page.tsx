import BoardCreateForm from '@/components/Board/BoardCreateForm'
import BoardCreateTipBox from '@/components/Board/BoardCreateTipbox'

function Create() {
   return (
      <div className="flex">
         <BoardCreateTipBox />
         <BoardCreateForm />
      </div>
   )
}

export default Create
