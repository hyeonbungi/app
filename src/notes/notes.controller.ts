import { Elysia, t } from 'elysia';
import { Note } from './note.model';

const notesController = new Elysia({
  prefix: '/notes',
  detail: { tags: ['Notes'] },
})
  .decorate('note', new Note())

  .post('', ({ note, body: { data } }) => note.create(data), {
    body: t.Object({
      data: t.String(),
    }),
  })

  .get('', ({ note }) => note.readAll())

  .guard({
    params: t.Object({
      index: t.Number(),
    }),
  })

  .get(
    ':index',
    ({ note, params: { index }, error }) =>
      note.readOne(index) ??
      error(404, `[ERROR] ${index}번째 노트는 존재하지 않습니다.`),
  )

  .patch(
    ':index',
    ({ note, params: { index }, body: { data }, error }) => {
      if (!(index in note.data)) {
        error(404, `[ERROR] ${index}번째 노트는 존재하지 않습니다.`);
      }

      return note.update(index, data);
    },
    {
      body: t.Object({ data: t.String() }),
    },
  )

  .delete(':index', ({ note, params: { index }, error }) => {
    if (!(index in note.data)) {
      error(404, `[ERROR] ${index}번째 노트는 존재하지 않습니다.`);
    }

    return note.delete(index);
  });

export default notesController;
