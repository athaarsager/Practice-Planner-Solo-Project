function AddPieceDialog() {
    return (
        <>
        <dialog>
            <form>
                <label htmlFor="title">Title</label><br />
                <input id="title" name="title" type="text" placeholder="Title Here" /><br />
                <label htmlFor="composer">Composer</label><br />
                <input id="composer" name="composer" type="text" placeholder="Composer Name" />
            </form>
        </dialog>
        </>
    );
}

export default AddPieceDialog;