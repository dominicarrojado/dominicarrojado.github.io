export async function getMoveTo() {
  let moveTo;

  try {
    const res = await import('moveto');

    moveTo = res.default;
  } catch (err) {
    console.error('Error on MoveTo import:', err);
  }

  return moveTo;
}
