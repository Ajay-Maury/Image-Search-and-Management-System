import styles from "./ImageList.module.css"
import { useEffect, useState } from 'react'
import { getImageListDataAsync, selectImageListState } from './ImageList.slice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import { IImageData, IPaginationAndSearchQuery } from './ImageList.interface'
import Navbar from "../../components/Navbar/Navbar"
import { Button, Input, Spin } from "antd"

const ImageList = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>("")
  const [paginationQuery, setPaginationQuery] = useState<IPaginationAndSearchQuery>({ limit: 12, offset: 0, searchText: "" })
  const { imagesData, loader, totalDocuments } = useAppSelector(selectImageListState)
  const totalPages = Math.ceil(totalDocuments / 12)

  useEffect(() => {
    dispatch(getImageListDataAsync(paginationQuery))
  }, [paginationQuery])

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
    setPaginationQuery({ limit: 12, offset: (currentPage - 2) * 12 });
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    setPaginationQuery({ limit: 12, offset: currentPage * 12 });
  };

  const handleSearch = () => {
    setPaginationQuery((prev) => ({
      ...prev,
      searchText: searchText,
    }));
  };


  return (
    <div >
      <Navbar />
      {_.isEqual(loader, "loading") ? <div className={styles.LoaderDiv}><Spin /></div> :
        <>
              <div className={styles.SearchFilterContainer}>
                <div className={styles.SearchContainer}>
                  <Input
                    value={searchText}
                    placeholder="Enter title or description of image to search"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Button
                    onClick={handleSearch}
                    type="primary"
                  >
                    Search
                  </Button>
                </div>
              </div>
              
          {!_.isEmpty(imagesData) ? (
            <>
              <div className={styles.ImageContainer}>
                {imagesData.map(({ _id, description, title, imageUrl }: IImageData) => (
                  <div key={_id} className={styles.ImageContainerBox} onClick={() => navigate(`/image-detail/${_id}`)}>
                    <div className={styles.ImageBox}>
                      <img
                        src={imageUrl}
                        alt={title}
                      />
                    </div>
                    <p className={styles.DetailText}>{title}</p>
                    <p className={styles.DetailText}>{description}</p>
                  </div>
                ))}
              </div>
              <footer className={styles.Footer}> <Button type="primary" disabled={currentPage <= 1} onClick={handlePrev}>Prev</Button> <span>Page {currentPage} of {totalPages}</span> <Button type="primary" disabled={currentPage >= totalPages} onClick={handleNext} >Next</Button> </footer>
            </>
          ) : (
            <div className={styles.LoaderDiv}>Images not found</div>
          )}
        </>
      }
    </div>
  )
}

export default ImageList
