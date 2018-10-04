export default function validateUser(req, res, err, next) {

const { id } = req.params;

console.log("id ", id);
if(isNaN(id)){
	console.log("err", err);
	return err;
}


next();
}
// exports a function declared earlier
export { validateUser };
