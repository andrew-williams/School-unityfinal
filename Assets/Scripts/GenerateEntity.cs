using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GenerateEntity : MonoBehaviour {
	// This class will generate entities at random spawn locations during runtime.
	// To set spawn locations, move spawn nodes around. You may copy paste for more nodes.
	public Transform entityPrefab; // This is the desired entity you wish to spawn
	public List<Transform> nodes = new List<Transform>(); // This is the array to hold all the spawn locations
	public int amount = 0; // The amount of entities to spawn.
	// Use this for initialization
	void Start () {
		GrabNodes();
	}
	
	// Update is called once per frame
	void Update () {
		if (amount != 0 && amount <= nodes.Count){
			SpawnEntity();
			amount--;
		}
	}
	/*
	 * Function: GrabNodes
	 * 
	 * This function will grab every node inside this object and adds it to the array.
	 * This function also hides all the nodes so it will not be visible in-game.
	 * 
	*/
	void GrabNodes() {
		foreach (Transform child in transform){
			//child.renderer.enabled = false;
			nodes.Add(child);
    	}	
		//Debug.Log ("Nodes Detected: " + nodes.Count + ", this is: " + nodes[0]);
	}
	
	/*
	 * Function SpawnEntity
	 *
	 * This function will spawn an entity at a random location. Then remove that location from the list
	 * to prevent the next spawn from spawning on top of another entity.
	 * 
	*/
	void SpawnEntity () {
		int randomLoc = 0; // Declare random location
		randomLoc = Random.Range (0,nodes.Count); // Select random location
		Debug.Log ("Spawning at: " + nodes[randomLoc]);
		Transform entityCreate; // Declare entity to instantiate
		entityCreate = Instantiate (entityPrefab) as Transform; // Instantiate the entity
		GameObject target = nodes[randomLoc].gameObject; // Declare spawn node target
		entityCreate.position = target.transform.position; // Set the entity at spawn node position
		nodes.RemoveAt(randomLoc); // Remove the spawn node from the list to prevent overlap spawn
	}
}
