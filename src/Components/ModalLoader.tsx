import { useState, useRef } from "react";
import MovieModal from './MovieModal';

interface ModalLoaderProps{
    mediaList: never[]
    typeofmedia: string
    tvGenres: never[]
    movieGenres: never[]
    listId: number;
    myfunct: (item: string) => void
    thisId: string
}
let myindex: number;
const ModalLoader = ({mediaList, typeofmedia, tvGenres, movieGenres, listId, myfunct, thisId} : ModalLoaderProps) => {
    const [index, setIndex] = useState(-1);
    const myRefname = useRef<HTMLButtonElement>(null)
    const handleId = () => {
        console.log(index.toString()+listId.toString())
        console.log(thisId)
        myfunct(myindex.toString()+listId.toString());
    }
  return (
   <>
   {(mediaList) ? mediaList
        .filter(mediaItem => mediaItem['media_type'] !== "person" && mediaItem['poster_path'])
        
        .map((mediaItem, thisMediaItemIndex) => (
        
        
          // on mouse down load, detailed info from api for that media only. This works by setting clicked index to index of chosen media item and only showing MovieModal(detailed info) on click of that media item
          //however mouse down alone doesnt actually pull up modal with information. To show the modal, on mouse up, invoke the click function on the modal through code. 
          // this way a single click (up and down) loads api data and opend modal, one click (onClick) wasnt working to do both. 
        <div key={thisMediaItemIndex} tabIndex={-1} className=" rounded p-0 overflow-hidden text "  onMouseDown = {() => {
          // !# currentIndex = thisMediaItemIndex;
          setIndex(thisMediaItemIndex)
          myindex = thisMediaItemIndex;
          handleId()
          
        } 
          
          }  onMouseUp = {() => { 
            myRefname.current?.click()
            
            }}>
                <button className='modal-loader-button btn btn-light rounded d-flex justify-content-center align-items-center z-3 text-black'>
                    <h4>View Details</h4>
                </button>
              {/* only generate a button and modal if the index you click equals index of list mediaItem */}
           { thisId === thisMediaItemIndex.toString()+listId.toString() ?    <div>
              <button key={thisMediaItemIndex} type="button" ref={myRefname} className="link-button bg-primary" data-bs-toggle="modal" data-bs-target="#mediaModal"  />
             <MovieModal  title={( mediaItem['media_type'] === 'movie' || typeofmedia === 'movie' ) ? mediaItem['title'] : mediaItem['name'] } description={mediaItem['overview']} headerImage={mediaItem['backdrop_path']} releaseYear={
                                                                                                                                                                                                                             () => {
                                                                                                                                                                                                                              if (mediaItem['release_date'])
                                                                                                                                                                                                                              {
                                                                                                                                                                                                                                    return (( mediaItem['release_date'] as string).substring(0,4));
                                                                                                                                                                                                                             } else if (mediaItem['first_air_date'])
                                                                                                                                                                                                                             {
                                                                                                                                                                                                                              return ((mediaItem['first_air_date'] as string).substring(0,4));
                                                                                                                                                                                                                             }
                                                                                                                                                                                                                             else
                                                                                                                                                                                                                             {
                                                                                                                                                                                                                              return "unkown release date";
                                                                                                                                                                                                                             }
                                                                                                                                                                                                                            }
             
                                                                                                                                                                                                                            }
             
              posterImage={mediaItem['poster_path']} genres={
                                                           mediaItem['media_type'] === 'tv' && tvGenres && movieGenres ? tvGenres : movieGenres
              } mediaType={(mediaItem['media_type']) ? mediaItem['media_type'] : typeofmedia } rating={mediaItem['vote_average'] } thisGenreId={mediaItem['genre_ids']} mediaID={mediaItem['id']} voteCount={mediaItem['vote_count']} ></MovieModal>
           </div> : undefined} 
        </div>
       
        )) : "empty"}
    </>
  )
}

export default ModalLoader