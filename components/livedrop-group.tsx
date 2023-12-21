import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'

import LivedropCard from './livedrop-card'
import { Container } from '@chakra-ui/react'
import { store } from '../utils/stroe'

export interface LivedropGroupProps {}

const LivedropGroup = (props: LivedropGroupProps) => {
  return (
    <Container maxW="1512px" p="0">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={24}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
      >
        {store
          .get()
          ?.filter((item: any) => {
            const currRound = item.rounds.find(
              (r: any) => r.enableWhitelist && r.isOpen
            )
            return !item?.ended && Boolean(currRound)
          })
          .map((item: any, index: number) => {
            const currRound = item.rounds.find((r: any) => r.isOpen)
            return (
              <SwiperSlide key={index}>
                <LivedropCard
                  round={currRound}
                  imageUrl={item?.cover}
                  totalItems={item?.totalSupply}
                  totalRound={item?.rounds.length}
                  collectionAddress={item.collectionAddress}
                  candyAddress={item.candyAddress}
                  name={item.name}
                  owner={item.owner}
                  mint={item.mint}
                  amount={item.amonut}
                />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </Container>
  )
}

export default LivedropGroup
