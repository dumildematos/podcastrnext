import { GetStaticProps } from "next";
import Image from "next/image";
import Link from 'next/link';
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

import styles from './home.module.scss';
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";


type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    publishAt: string;
    duration: number;
    durationAsString: string;
    description: string;
    url: string;
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

export default function Home({latestEpisodes, allEpisodes}: HomeProps) {

  const { play } = useContext(PlayerContext)

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos </h2>

        <ul>
            {
              latestEpisodes.map(episode => {
                return(
                  <li key={episode.id}>
                      <Image 
                      src={episode.thumbnail} 
                      alt={episode.title} 
                      width="300" 
                      height="100"
                      objectFit="cover"
                      />

                      <div className={styles.episodeDatails}>
                        <Link href={`/episode/${episode.id}`}>
                          <a>{episode.title}</a>
                        </Link>
                        <p>{episode.members}</p>
                        <span>{episode.publishAt}</span>
                        <span>{episode.durationAsString}</span>
                      </div>

                      <button type="button" onClick={() => play(episode)}>
                        <Image src="/play-green.svg" alt="Tocar Episodio"  width="40" height="40"/>
                      </button>
                  </li>
                )
              })
            }
        </ul>

      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos episódios</h2>
        <table cellSpacing={0}>
            <thead>
              <tr>
              <th></th>
              <th>Podcast</th>
              <th>Convidados</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
              </tr>
            </thead>
            <tbody>
              {
                allEpisodes.map(episode => {
                  return (
                    <tr key={episode.id}>
                      <td style={{width: 72}}>
                        <Image 
                          width={120}
                          height={120}
                          src={episode.thumbnail}
                          alt={episode.title}
                          objectFit="cover"
                        />
                      </td>
                      <td>
                        <Link href={`/episode/${episode.id}`}>
                          <a>{episode.title}</a>
                        </Link>
                      </td>
                      <td>
                        {episode.members}
                      </td>
                      <td style={{width: 100}}>
                        {episode.publishAt}
                      </td>
                      <td>
                        {episode.durationAsString}
                      </td>
                      <td>
                        <button type="button"> h
                          <Image src="/play-green.svg" alt="Tocar Episodio"  width="40" height="40"/>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
        </table>
      </section>
    </div>
  )
}


export  const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: "punlished_at",
      _order: "desc"
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishAt: format(parseISO(episode.published_at), 'd MMM YYY', {
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })  

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props:{
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }

}