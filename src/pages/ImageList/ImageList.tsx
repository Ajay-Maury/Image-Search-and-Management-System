import  { useEffect } from 'react'
import { getImageListDataAsync, selectImageListState } from './ImageList.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { IImageData } from './ImageList.interface'

const ImageList = () => {
const dispatch = useAppDispatch()
const {imagesData,loader,message,totalDocuments} = useAppSelector(selectImageListState)
console.log('imagesData,loader,message,totalDocuments:', imagesData,loader,message,totalDocuments)

    useEffect(()=>{
        dispatch(getImageListDataAsync())
    },[])

  return (
    <div>
         {!_.isEmpty(imagesData) ? (
        <div id="movie">
          {imagesData.map((element:IImageData, i) => (
            <div key={i} className="box">
              {/* <Link
                to={`/details/${
                  element._id}`}
                id="link"
              > */}
              
                <div className="img_box">
                  <img
                    src={element.imageUrl}
                    alt={element.title}
                  />
                </div>
                <p>{element.title}</p>
                <p>
                  {element.description}
                </p>
              {/* </Link> */}
            </div>
          ))}
        </div>
      ) : (
        <p>Movie not found</p>
      )}
    </div>
  )
}

export default ImageList