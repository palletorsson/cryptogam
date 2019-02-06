// use this to scrip to make a simpel synthesizer with the Unity 3d game engine

using UnityEngine;

public class rot : MonoBehaviour
{
    [Range(1f, 100f)]
    public float speedUpDown = 10;
    [Range(1f, 20f)]
    public float distanceUpDown = 1;
    [Range(-10f, 10f)]
    public float offset = 0;
    void Update()
    {
        Vector3 mov = new Vector3(
              (Mathf.Cos(speedUpDown * Time.time) * distanceUpDown) + offset,
              transform.position.y,
              (Mathf.Sin(speedUpDown * Time.time) * distanceUpDown) + offset);
        transform.position = mov;
    }
}
