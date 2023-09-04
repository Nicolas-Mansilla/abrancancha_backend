import { Injectable } from '@nestjs/common';
import { Players } from './players.interface';
import { log } from 'console';
const BASE_URL = 'http://localhost:3030/padelplayers';

@Injectable()
export class PlayersService {
  async getPlayers(): Promise<Players[]> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed;
  }

  async getPlayersById(id: number): Promise<Players[]> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    return parsed;
  }

  async deletePlayersById(id: number): Promise<any> {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
  async updatePlayersById(id:number ,body:Players):Promise<void>{
    const isPlayer=await this.getPlayersById(id);
    if(!Object.keys(isPlayer).length)return;
    const updatePlayer={...body,id};
    console.log('updatePlayer',updatePlayer);
    const res =await fetch(BASE_URL +id,{
      method:'PUT',
      headers:{
        'Content-Type':'aplication/json',
      },
      body:JSON.stringify(updatePlayer),
    });
    const parsed =await res.json();
    return parsed;
    
  }

  async createPlayer(players: Players) {
    const id = await this.setId();
    const newPlayer = {
      ...players,
      id,
    };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    });
    const parsed = res.json();
    return parsed;
  }

  private async setId(): Promise<number> {
    const players = await this.getPlayers();
    const id = players.pop().id + 1;
    return id;
  }
}
