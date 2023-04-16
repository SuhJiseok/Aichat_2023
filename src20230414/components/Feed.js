import React, { useEffect, useState } from 'react'
import { doc, deleteDoc, updateDoc} from "firebase/firestore"
import { db, storage } from 'fbase';
import { ref, deleteObject } from "firebase/storage";
import '../styles/Feed.scss';
function Feed(props) {

  console.log("props->",props);
  const {feedObj:{text,id,attachmentUrl,createdAt},isOwner} = props;
  const [editing, setEditing] = useState(false);
  const [newFeed, setNewFeed] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);

//삭제
  const onDeleteClick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const feedContent = document.querySelector(".FeedContent");
      feedContent.style.animation = "deflate 0.5s forwards";

      setTimeout(async () =>{
        const data = await deleteDoc(doc(db, "feeds", `/${id}`));
        if(attachmentUrl !== ""){
          const desertRef = ref(storage, attachmentUrl);
          await deleteObject(desertRef);
        }
      },500);
    }
  }
  //수정
  const toggleEditing = () => setEditing((prev) => !prev); //토글기능

  const onChange = (e) =>{
    const {target:{value}} = e;
    setNewFeed(value);
  }
  const onSubmit = async(e) =>{
    e.preventDefault();
    const newFeedRef = doc(db, "feeds", `/${id}`);

    await updateDoc(newFeedRef, {
      text: newFeed,
      createdAt: Date.now(),
    });
    props.feedObj.text = newFeed;
    props.feedObj.updatedAt = Date.now();
    setEditing(false);
  }

  useEffect(()=>{
    let timeStamp = createdAt
    const now = new Date(timeStamp);
    setNowDate(now.toDateString());
  },[])

  return (
      <div className="FeedContent">
        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input type='text' onChange={onChange} value={newFeed} required />
              <input type='submit' value='Update Feed' />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
          </>
        ):(
          <>
          <h4>{text}</h4>
          {attachmentUrl &&(
          <img className="timelineimg" src={attachmentUrl} alt="" />
          )}
       
          {isOwner && (
            <>
            <button className="delete" onClick={onDeleteClick}>Delete Feed</button>
            <button className="edit" onClick={toggleEditing}>Edit Feed</button>
            </>
          )}
          </>
        )}
          <span>{nowDate}</span>


      </div>
  )
}

export default Feed